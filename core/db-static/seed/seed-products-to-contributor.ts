import { prisma } from "@/core/prisma/prisma";
import { ContributorType } from "@prisma/client";

export async function seedProductsToContributors() {
  console.log("🚀 Inizio assegnazione prodotti ai contributor...");

  // 1. Trova tutti i contributor di tipo SHELTER o RETAILER
  const contributors = await prisma.contributor.findMany({
    where: {
      type: { in: [ContributorType.SHELTER, ContributorType.RETAILER] },
    },
  });

  // 2. Trova tutti i prodotti senza contributor
  const unassignedProducts = await prisma.product.findMany({
    where: { contributorId: null },
  });

  if (unassignedProducts.length === 0) {
    console.log("❌ Nessun prodotto disponibile da assegnare.");
    return;
  }

  let productIndex = 0;

  for (const contributor of contributors) {
    console.log(
      `➡️ Assegno prodotti a ${contributor.name} (${contributor.type})`
    );

    // 3. Assegna almeno 10 prodotti a ogni contributor
    const productsToAssign = unassignedProducts.slice(
      productIndex,
      productIndex + 10
    );

    if (productsToAssign.length === 0) {
      console.log(`⚠️ Non ci sono abbastanza prodotti per ${contributor.name}`);
      continue;
    }

    await Promise.all(
      productsToAssign.map((product) =>
        prisma.product.update({
          where: { id: product.id },
          data: { contributorId: contributor.id },
        })
      )
    );

    productIndex += 10;

    console.log(
      `✅ Assegnati ${productsToAssign.length} prodotti a ${contributor.name}`
    );
  }

  console.log("🎉 Assegnazione completata.");
}
