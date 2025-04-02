"use server";

import { prisma } from "@/core/prisma/prisma";
import { DefaultSession, User } from "next-auth";

export async function removeRequestedProductFromContributor({
  user,
  contributorId,
  requestedProductId,
}: {
  user?: (User & DefaultSession["user"]) | null;
  contributorId?: string;
  requestedProductId: string;
}) {
  if (!requestedProductId) {
    throw new Error("❌ requestedProductId mancante");
  }

  // Autorizzazione utente
  if (user && !contributorId) {
    const contributor = await prisma.contributor.findFirst({
      where: {
        users: { some: { id: user.id } },
      },
      select: { id: true },
    });

    if (!contributor) {
      throw new Error("⛔ Nessun contributor associato all'utente");
    }

    contributorId = contributor.id;
  }

  if (!contributorId) {
    throw new Error("⛔ contributorId mancante");
  }

  // Verifica se il prodotto richiesto appartiene al contributor
  const requestedProduct = await prisma.requestedProduct.findFirst({
    where: {
      id: requestedProductId,
      contributorId,
    },
  });

  if (!requestedProduct) {
    throw new Error(
      "❌ RequestedProduct non trovato o non associato al contributor"
    );
  }

  // Elimina il requestedProduct
  await prisma.requestedProduct.delete({
    where: {
      id: requestedProductId,
    },
  });

  return {
    success: true,
    message: "✅ RequestedProduct rimosso con successo",
  };
}
