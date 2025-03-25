"use client";

import { createContributor } from "@/core/actions/contributors/create-contributor";
import { updateContributor } from "@/core/actions/contributors/update-contributor";
import {
  IContributor,
  contributorSchema,
} from "@/core/validators/contributors.validator";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Qui definisci i tuoi campi dinamici
export const contributorFields = [
  { name: "name", label: "Nome", type: "text" },
  { name: "slug", label: "Slug", type: "text" },
  {
    name: "type",
    label: "Tipo",
    type: "select",
    options: ["PARTNER", "CANILE", "GATTILE"],
  },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Telefono", type: "text" },
  { name: "website", label: "Sito web", type: "url" },
  { name: "logo", label: "Logo", type: "image" },
  { name: "coverImage", label: "Cover", type: "image" },
  { name: "description", label: "Descrizione", type: "textarea" },
  { name: "descriptionLong", label: "Descrizione lunga", type: "textarea" },
  { name: "tags", label: "Tags", type: "tags" },
  { name: "city", label: "Città", type: "text" },
  { name: "province", label: "Provincia", type: "text" },
  { name: "region", label: "Regione", type: "text" },
  { name: "zipCode", label: "CAP", type: "text" },
  { name: "partitaIva", label: "Partita IVA", type: "text" },
  { name: "acceptsDonations", label: "Accetta donazioni?", type: "checkbox" },
  { name: "donationLink", label: "Link Donazione", type: "url" },
  { name: "volunteerNeeded", label: "Cerca volontari?", type: "checkbox" },
  { name: "seoTitle", label: "Titolo SEO", type: "text" },
  { name: "seoDescription", label: "Descrizione SEO", type: "textarea" },
];

export function useContributorForm({
  type,
  contributor,
  contributorId,
}: {
  type: "Create" | "Update";
  contributor?: IContributor;
  contributorId?: string;
}) {
  const router = useRouter();
  const { toast } = useToast();

  const schema = contributorSchema;

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: contributor ?? {},
  });

  const uploadToBlob = async (fileUrl: string): Promise<string> => {
    const file = await fetch(fileUrl).then((r) => r.blob());
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload/images", {
      method: "POST",
      body: formData,
    });
    const json = await res.json();
    return json.url;
  };

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      if (data.logo?.startsWith("blob:")) {
        data.logo = await uploadToBlob(data.logo);
      }

      if (data.coverImage?.startsWith("blob:")) {
        data.coverImage = await uploadToBlob(data.coverImage);
      }

      const res =
        type === "Create"
          ? await createContributor(data)
          : await updateContributor(contributorId as string, data);

      toast({
        className: "bg-green-100 text-green-700 px-5 py-2",
        title: "Successo",
        description: `Contributor ${data.name} ${type === "Create" ? "creato" : "aggiornato"} con successo.`,
      });

      router.push("/admin/contributors");
    } catch (error: any) {
      toast({
        className: "bg-red-100 text-red-700 px-5 py-2",
        title: "Errore",
        description: error?.message ?? "Errore sconosciuto",
      });
    }
  };

  return { form, onSubmit, fields: contributorFields };
}
