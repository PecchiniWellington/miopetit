import { prisma } from "@/core/prisma/prisma";
import { ContributorType } from "@prisma/client";

export async function seedRequestedProductsForShelters() {
  console.log("🐶 Inizio seed richieste prodotti per i canili...");

  const shelters = await prisma.contributor.findMany({
    where: {
      type: ContributorType.SHELTER,
    },
  });

  const allProducts = await prisma.product.findMany();

  if (allProducts.length < 10) {
    console.log("❌ Non ci sono abbastanza prodotti nel database.");
    return;
  }

  for (const shelter of shelters) {
    console.log(`➡️ Genero richieste per ${shelter.name}...`);

    const randomProducts = shuffleArray(allProducts).slice(0, 10);

    await Promise.all(
      randomProducts.map((product) => {
        const quantity = Math.floor(Math.random() * 10) + 1; // 1-10
        const price = product.price;
        const targetAmount = Number(price) * quantity;

        return prisma.requestedProduct.create({
          data: {
            contributorId: shelter.id,
            name: product.name,
            // Removed 'image' property as it is not defined in the Prisma schema
            price: Number(price),
            quantity,
            targetAmount,
            fundedAmount: 0,
            notes: "Prodotto richiesto automaticamente per test",
            // Removed 'priority' property as it is not defined in the Prisma schema
            baseProductId: product.id,
          },
        });
      })
    );

    console.log(`✅ Aggiunti 10 prodotti richiesti a ${shelter.name}`);
  }

  console.log("🎉 Seed richieste completato.");
}

// Utility per mescolare array
function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
