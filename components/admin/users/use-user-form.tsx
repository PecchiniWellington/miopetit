"use client";

import { createUser } from "@/core/actions/admin/user/create-user.action";
import { updateUser } from "@/core/actions/admin/user/update-user.action";
import {
  createUserSchema,
  IUpdateUser,
  updateUserSchema,
} from "@/core/validators/user.validator";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const replaceBlobImageClient = async ({
  newFileUrl,
  previousUrl,
  folder,
}: {
  newFileUrl: string;
  previousUrl?: string;
  folder?: string;
}): Promise<string> => {
  try {
    // ✅ Forza la cancellazione se richiesto
    if (newFileUrl.startsWith("blob:") && previousUrl?.startsWith("https://")) {
      await fetch("/api/upload/images/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: previousUrl }),
      });
    }

    const file = await fetch(newFileUrl).then((r) => r.blob());
    const formData = new FormData();
    formData.append("file", file);
    if (folder) formData.append("folder", folder);

    const res = await fetch("/api/upload/images/create", {
      method: "POST",
      body: formData,
    });

    const json = await res.json();
    return json.url;
  } catch (err) {
    console.error("❌ Errore durante replaceBlobImageClient:", err);
    throw err;
  }
};

export function useUserForm({
  type,
  user,
  folder,
}: {
  type: "Create" | "Update";
  user?: IUpdateUser;
  folder?: string;
}) {
  const router = useRouter();
  const { toast } = useToast();

  const schema = type === "Create" ? createUserSchema : updateUserSchema;
  type FormValues = z.infer<typeof schema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: user,
  });

  const onSubmit = async (data: FormValues) => {
    console.log("Dati inviati:", data, type);
    const roleChanged = data.role !== user?.role;
    const isNewImage = data.image?.startsWith("blob:");

    if (isNewImage || roleChanged) {
      const imageUrlToReupload = isNewImage ? data.image : user?.image;
      if (imageUrlToReupload) {
        data.image = await replaceBlobImageClient({
          newFileUrl: imageUrlToReupload,
          previousUrl: user?.image,
          folder: `${folder}/${data.role}`,
        });
      }
    }
    const res =
      type === "Create"
        ? await createUser({ ...data, id: null }) // in futuro potrai usare createUser
        : await updateUser({ ...data, id: user?.id as string });

    if (!res.success) {
      toast({
        className: "bg-red-100 text-red-700 px-5 py-2",
        title: "Errore",
        description: res.message,
      });
    } else {
      toast({
        className: "bg-green-100 text-green-700 px-5 py-2",
        title: "Successo",
        description: `Utente ${type === "Create" ? "creato" : "aggiornato"} con successo`,
      });
      router.push("/admin/users/all");
    }
  };

  return { form, onSubmit };
}
