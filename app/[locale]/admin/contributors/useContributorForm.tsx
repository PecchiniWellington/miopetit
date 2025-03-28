"use client";

import { createContributor } from "@/core/actions/contributors/create-contributor";
import { updateContributor } from "@/core/actions/contributors/update-contributor";
import {
  contributorSchema,
  IContributor,
} from "@/core/validators/contributors.validator";
import { useToast } from "@/hooks/use-toast";
import ROLES from "@/lib/constants/roles";
import { normalizeUrl } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const rawSchema = contributorSchema.omit({
  id: true,
  user: true,
  userEmail: true,
  userName: true,
});

const createSchema = rawSchema.superRefine((data, ctx) => {
  if (data.type === "SHELTER" || data.type === "ASSOCIATION") {
    if (!data.donationLink || !data.donationLink.startsWith("http")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["donationLink"],
        message:
          "Il link alla donazione è obbligatorio e deve essere un URL valido",
      });
    }
    if (!data.animalTypes || data.animalTypes.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["animalTypes"],
        message: "Devi specificare almeno un tipo di animale",
      });
    }
  }
});

const updateSchema = rawSchema.partial().superRefine((data, ctx) => {
  if (
    (data.type === ROLES.SHELTER || data.type === ROLES.ASSOCIATION) &&
    data.donationLink
  ) {
    if (!data.donationLink.startsWith("http")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["donationLink"],
        message: "Il link alla donazione deve essere un URL valido",
      });
    }
  }
});

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

  const schema = type === "Create" ? createSchema : updateSchema;
  const allowedTypes = ["SHELTER", "ASSOCIATION", "RETAILER"] as const;
  type AllowedType = (typeof allowedTypes)[number];

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: contributor
      ? {
          ...contributor,
          createdAt: contributor.createdAt
            ? new Date(contributor.createdAt).toISOString()
            : undefined,
          updatedAt: contributor.updatedAt
            ? new Date(contributor.updatedAt).toISOString()
            : undefined,
          type: contributor.type as AllowedType,
          socialLinks: {
            instagram: contributor.socialLinks?.instagram ?? "",
            facebook: contributor.socialLinks?.facebook ?? "",
            tiktok: contributor.socialLinks?.tiktok ?? "",
          },
        }
      : {
          type: "RETAILER",
          name: "",
          slug: "",
          email: "",
          phone: "",
          website: "",
          logo: "",
          coverImage: "",
          description: "",
          descriptionLong: "",
          tags: [],
          address: "",
          city: "",
          province: "",
          region: "",
          zipCode: "",
          latitude: undefined,
          longitude: undefined,
          partitaIva: "",
          isOnlineShop: false,
          isPickupAvailable: false,
          deliveryAvailable: false,
          openingHours: "",
          socialLinks: {
            instagram: "",
            facebook: "",
            tiktok: "",
          },
          whatsappNumber: "",
          animalsAvailable: 0,
          animalTypes: [],
          acceptsDonations: false,
          donationLink: "",
          volunteerNeeded: false,
          needs: [],
          seoTitle: "",
          seoDescription: "",
        },
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
    if (data.logo?.startsWith("blob:")) {
      data.logo = await uploadToBlob(data.logo);
    }
    if (data.coverImage?.startsWith("blob:")) {
      data.coverImage = await uploadToBlob(data.coverImage);
    }

    if (data.website) {
      data.website = normalizeUrl(data.website);
    }
    if (data.donationLink) {
      data.donationLink = normalizeUrl(data.donationLink);
    }

    if (data.type === ROLES.RETAILER) {
      delete data.animalsAvailable;
      delete data.animalTypes;
      delete data.acceptsDonations;
      delete data.donationLink;
      delete data.volunteerNeeded;
      delete data.needs;
    }

    const parsed = schema.safeParse(data);

    if (!parsed.success) {
      console.error("❌ Form validation failed:", parsed.error.format());
      toast({
        title: "Validation Error",
        description: "Check required fields or data types",
        className: "bg-red-100 text-red-800 px-5 py-2",
      });
      return;
    }

    const finalData = {
      ...parsed.data,
      type: parsed.data.type as AllowedType,
      name: parsed.data.name ?? "Default Name",
      createdAt: parsed.data.createdAt
        ? new Date(parsed.data.createdAt as string)
        : undefined,
      updatedAt: parsed.data.updatedAt
        ? new Date(parsed.data.updatedAt as string)
        : undefined,
    };

    try {
      const result =
        type === "Create"
          ? await createContributor({
              ...finalData,
              createdAt: finalData.createdAt
                ? finalData.createdAt.toISOString()
                : undefined,
              updatedAt: finalData.updatedAt
                ? finalData.updatedAt.toISOString()
                : undefined,
            })
          : await updateContributor(
              {
                ...finalData,
                createdAt: finalData.createdAt
                  ? finalData.createdAt.toISOString()
                  : undefined,
                updatedAt: finalData.updatedAt
                  ? finalData.updatedAt.toISOString()
                  : undefined,
              },
              contributorId as string
            );

      toast({
        title: `${type} success`,
        description: `${result.name} ${type === "Create" ? "created" : "updated"} successfully`,
        className: "bg-green-100 text-green-800 px-5 py-2",
      });

      router.push("/admin/contributors");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      toast({
        title: "Error",
        description: errorMessage,
        className: "bg-red-100 text-red-800 px-5 py-2",
      });
    }

    console.log("🔵 Contributor submit:", {
      mode: type,
      id: contributorId,
      data: finalData,
    });
  };

  return { form, onSubmit };
}
