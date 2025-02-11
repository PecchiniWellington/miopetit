import { PrismaClient } from "@prisma/client";
import categoryData from "./category";
import productsData from "./product";
import productBrand from "./product-brand";
import productFeature from "./product-feature";
import productFormats from "./product-formats";
import productPathology from "./product-patology";
import productProteins from "./product-proteins";
import unitOfMeasure from "./unitOfMeasure";
import unitValue from "./unitValue";
import usersData from "./users";

const prisma = new PrismaClient();

async function main() {
  /* DELETE ALL RECORDS */
  await prisma.productProteinOnProduct.deleteMany(); // Many-to-Many
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.productProtein.deleteMany();
  await prisma.productFeatures.deleteMany();
  await prisma.productFormat.deleteMany();
  await prisma.productPathology.deleteMany();
  await prisma.productBrand.deleteMany();
  await prisma.user.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.unitOfMeasure.deleteMany();
  await prisma.unitValue.deleteMany();

  /* CREA ALTRI DATI */
  await prisma.category.createMany({ data: categoryData });
  console.log(`✅ Categories created`);
  await prisma.user.createMany({ data: usersData });
  console.log(`✅ Users created`);
  await prisma.productProtein.createMany({ data: productProteins });
  console.log(`✅ ProductProtein created`);
  await prisma.productFeatures.createMany({ data: productFeature });
  console.log(`✅ ProductFeatures created`);
  await prisma.productFormat.createMany({ data: productFormats });
  console.log(`✅ ProductFormat created`);
  await prisma.productPathology.createMany({ data: productPathology });
  console.log(`✅ ProductPathology created`);
  await prisma.productBrand.createMany({ data: productBrand });
  console.log(`✅ ProductBrand created`);
  await prisma.unitValue.createMany({ data: unitValue });
  console.log(`✅ UnitValues created`);
  await prisma.unitOfMeasure.createMany({ data: unitOfMeasure });
  console.log(`✅ UnitOfMeasure created`);

  // 📌 Recupera gli ID
  const categories = await prisma.category.findMany({ select: { id: true } });

  const brandData = await prisma.productBrand.findMany({
    select: { id: true },
  });
  const productProteinsData = await prisma.productProtein.findMany({
    select: { id: true },
  });

  if (categories.length === 0) {
    throw new Error("No categories found. Seeding failed.");
  }

  console.log(`⏳ Start creating products...`);
  /* CREA I PRODOTTI ASSEGNANDO UN CATEGORY ID RANDOMICO */
  for (const product of productsData) {
    const numProteins = Math.floor(Math.random() * 3) + 1; // Da 1 a 3 proteine
    const selectedProteins = productProteinsData
      .sort(() => 0.5 - Math.random()) // Mischia l'array
      .slice(0, numProteins); // Prende solo le prime `numProteins`

    const createdProduct = await prisma.product.create({
      data: {
        ...product,
        categoryId:
          categories[Math.floor(Math.random() * categories.length)].id,
        productBrandId:
          brandData[Math.floor(Math.random() * brandData.length)].id,

        // Associa proteine random al prodotto
        productProteins: {
          create: selectedProteins.map((protein) => ({
            productProtein: { connect: { id: protein.id } },
          })),
        },
      },
    });

    console.log(
      `→   ✅ Created product: ${createdProduct.name} with ${selectedProteins.length} proteins`
    );
  }

  console.log("Database seeded successfully 🎉");

  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error("Seeding failed:", e);
  await prisma.$disconnect();
  process.exit(1);
});
