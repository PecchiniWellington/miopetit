"use server";
import { prisma } from "@/core/prisma/prisma";
import { contributorSchema } from "@/core/validators/contributors.validator";
import { convertToPlainObject } from "@/lib/utils";
import { z } from "zod";

export async function getAllContributors() {
  const data = await prisma.contributor.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  const arraySchema = z.array(contributorSchema);
  const validated = arraySchema.safeParse(convertToPlainObject(data));

  if (!validated.success) {
    console.error(
      "❌ Errore validazione contributor con user:",
      validated.error.format()
    );
    throw new Error("Errore validazione contributor");
  }

  return validated.data;
}
