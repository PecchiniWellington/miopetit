"use client";

import { createAnimal } from "@/core/actions/admin/animals/create-animals.action";
import { updateAnimal } from "@/core/actions/admin/animals/update-animals.action";
import {
  IUpdateAnimal,
  createAnimalSchema,
  updateAnimalSchema,
} from "@/core/validators/animal.validator";

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

export function useAnimalForm({
  type,
  animal,
  folder,
}: {
  type: "Create" | "Update";
  animal?: IUpdateAnimal;
  folder?: string;
}) {
  const router = useRouter();
  const { toast } = useToast();

  const schema = type === "Create" ? createAnimalSchema : updateAnimalSchema;
  type FormValues = z.infer<typeof schema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...animal,
      intakeDate: animal?.intakeDate
        ? new Date(animal.intakeDate).toISOString().split("T")[0]
        : "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    const isNewImage = data.photoUrl?.startsWith("blob:");

    if (isNewImage) {
      data.photoUrl = await replaceBlobImageClient({
        newFileUrl: data.photoUrl ?? "",
        previousUrl: animal?.photoUrl ?? undefined,
        folder,
      });
    }

    // ✅ Conversione intakeDate da stringa a oggetto Date
    const payload = {
      ...data,
      intakeDate: new Date(data.intakeDate),
      description: data.description ?? undefined, // Ensure description is undefined if null
      photoUrl: data.photoUrl || undefined, // Ensure photoUrl is undefined if null
    };

    const res =
      type === "Create"
        ? await createAnimal(payload)
        : await updateAnimal(animal?.id as string, payload);

    if (!res) {
      toast({
        className: "bg-red-100 text-red-700 px-5 py-2",
        title: "Errore",
        description: "Impossibile creare o aggiornare l'animale",
      });
    } else {
      toast({
        className: "bg-green-100 text-green-700 px-5 py-2",
        title: "Successo",
        description: `Animale ${type === "Create" ? "creato" : "aggiornato"} con successo`,
      });
      router.push("/admin/animals/all");
    }
  };

  return { form, onSubmit };
}
