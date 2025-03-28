"use server";

import { prisma } from "@/core/prisma/prisma";
import {
  contributorSchema,
  IContributor,
} from "@/core/validators/contributors.validator";
import { Prisma } from "@prisma/client";

export async function updateContributor(data: IContributor, id: string) {
  // 🔁 Converti manualmente stringhe in Date se presenti
  const cleanData = {
    ...(typeof data === "object" && data !== null ? data : {}),
    createdAt:
      typeof (data as IContributor).createdAt === "string"
        ? new Date(data.createdAt ?? "")
        : undefined,
    updatedAt:
      typeof (data as IContributor).updatedAt === "string"
        ? new Date(data.updatedAt ?? "")
        : undefined,
  };

  const parsed = contributorSchema.partial().safeParse(cleanData);
  if (!parsed.success) {
    console.error("❌ Parsing failed:", parsed.error.flatten());
    throw new Error("Invalid contributor update data");
  }

  const updated = await prisma.contributor.update({
    where: { id },
    data: parsed.data as Prisma.ContributorUpdateInput,
  });

  return updated;
}
