"use client";

import { createUser } from "@/core/actions/admin/user/create-user.action";
import { updateUser } from "@/core/actions/admin/user/update-user.action";
import {
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
}: {
  newFileUrl: string;
  previousUrl?: string;
}): Promise<string> => {
  try {
    if (previousUrl && previousUrl.startsWith("https://")) {
      await fetch("/api/upload/images/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: previousUrl }),
      });
    }

    const file = await fetch(newFileUrl).then((r) => r.blob());
    const formData = new FormData();
    formData.append("file", file);

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
}: {
  type: "Create" | "Update";
  user: IUpdateUser;
}) {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: user,
  });

  const onSubmit = async (data: z.infer<typeof updateUserSchema>) => {
    console.log("Dati inviati:", data, type);

    if (data.image && data.image?.startsWith("blob:")) {
      data.image = await replaceBlobImageClient({
        newFileUrl: data.image,
        previousUrl: user.image,
      });
    }
    const res =
      type === "Create"
        ? await createUser(data) // in futuro potrai usare createUser
        : await updateUser({ ...data, id: user.id as string });

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
