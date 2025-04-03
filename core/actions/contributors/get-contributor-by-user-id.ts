"use server";

import { prisma } from "@/core/prisma/prisma";
import { contributorSchema } from "@/core/validators/contributors.validator";

export async function getContributorByUserId(userId?: string) {
  const contributor = await prisma.contributor.findFirst({
    where: {
      users: {
        some: {
          id: userId,
        },
      },
    },
    include: {
      users: true,
      requestedProducts: true,
    },
  });

  if (!contributor) return null;

  // 🛠️ Convertiamo createdAt/updatedAt degli utenti in stringhe ISO
  const normalizedContributor = {
    ...contributor,
    createdAt: contributor.createdAt.toISOString(),
    updatedAt: contributor.updatedAt.toISOString(),
    users: contributor.users.map((user) => ({
      ...user,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    })),
    requestedProducts: contributor.requestedProducts.map((product) => ({
      ...product,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
    })),
  };

  const validated = contributorSchema.safeParse(normalizedContributor);

  if (!validated.success) {
    console.error(
      "❌ Errore validazione contributor con user:",
      validated.error.format()
    );
    return null;
  }

  return validated.data;
}
