import { prisma } from "@/core/prisma/prisma";
import { ContributorType } from "@prisma/client";

export async function seedProductsToContributors() {
  console.log("🚀 Inizio assegnazione prodotti ai RETAILER...");

  // 1. Trova solo i contributor di tipo RETAILER
  const retailers = await prisma.contributor.findMany({
    where: {
      type: ContributorType.RETAILER,
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

  for (const contributor of retailers) {
    console.log(`➡️ Assegno prodotti a ${contributor.name}`);

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
