import { PrismaClient } from "@prisma/client";
import categoryData from "./category";
import productsData from "./product";
import productBrand from "./product-brand";
import productFeature from "./product-feature";
import productPathology from "./product-pathology";
import productProteins from "./product-proteins";
import unitOfMeasureData from "./unit-of-measure";
import unitValuesData from "./unit-value";
import usersData from "./users";

const prisma = new PrismaClient();

async function main() {
  /* DELETE ALL RECORDS */
  console.log(`✅ Start deleting all previews tables...`);
  await prisma.productProteinOnProduct.deleteMany(); // Many-to-Many
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.productProtein.deleteMany();
  await prisma.productFeatures.deleteMany();
  await prisma.productPathology.deleteMany();
  await prisma.productBrand.deleteMany();
  await prisma.user.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.unitOfMeasure.deleteMany();
  await prisma.unitValue.deleteMany();
  console.log(`✅ Deleted All Previews tables`);

  /* CREATE OTHER DATA */
  await prisma.category.createMany({ data: categoryData });
  console.log(`✅ Categories created`);
  await prisma.user.createMany({ data: usersData });
  console.log(`✅ Users created`);
  await prisma.productProtein.createMany({ data: productProteins });
  console.log(`✅ ProductProtein created`);
  await prisma.productFeatures.createMany({ data: productFeature });
  console.log(`✅ ProductFeatures created`);
  await prisma.productPathology.createMany({ data: productPathology });
  console.log(`✅ ProductPathology created`);
  await prisma.productBrand.createMany({ data: productBrand });
  console.log(`✅ ProductBrand created`);
  await prisma.unitValue.createMany({ data: unitValuesData });
  console.log(`✅ unitValue created`);
  await prisma.unitOfMeasure.createMany({ data: unitOfMeasureData });
  console.log(`✅ unitOfMeasure created`);

  // 🔹 Step 3: Retrieve all values of UnitValue and UnitOfMeasure
  const unitValues = await prisma.unitValue.findMany();
  const unitMeasures = await prisma.unitOfMeasure.findMany();

  // 🔹 Step 4: Dynamically generate combinations (UnitValue x UnitOfMeasure)
  const productUnitFormatsToInsert = [];

  for (const value of unitValues) {
    for (const measure of unitMeasures) {
      productUnitFormatsToInsert.push({
        unitValueId: value.id,
        unitMeasureId: measure.id,
      });
    }
  }

  // 🔹 Step 5: Insert only unique combinations
  for (const format of productUnitFormatsToInsert) {
    await prisma.productUnitFormat.upsert({
      where: {
        unitValueId_unitMeasureId: {
          unitValueId: format.unitValueId,
          unitMeasureId: format.unitMeasureId,
        },
      },
      update: {}, // No update if it already exists
      create: format, // Create the combination if it does not exist
    });
  }

  console.log("✅ ProductUnitFormat generated dynamically");
  const productUnitFormats = await prisma.productUnitFormat.findMany({
    select: { id: true },
  });

  // 📌 Retrieve the IDs
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
  for (const product of productsData) {
    const numProteins = Math.floor(Math.random() * 3) + 1;
    const selectedProteins = productProteinsData
      .sort(() => 0.5 - Math.random())
      .slice(0, numProteins);

    const randomProductUnitFormat =
      productUnitFormats[Math.floor(Math.random() * productUnitFormats.length)];

    const createdProduct = await prisma.product.create({
      data: {
        ...product,

        category: {
          connect: {
            id: categories[Math.floor(Math.random() * categories.length)].id,
          },
        },

        productBrand: {
          connect: {
            id: brandData[Math.floor(Math.random() * brandData.length)].id,
          },
        },

        productProteinOnProduct: {
          create: selectedProteins.map((protein) => ({
            productProtein: { connect: { id: protein.id } },
          })),
        },
        productUnitFormat: {
          connect: { id: randomProductUnitFormat.id },
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

main()
  .catch((error) => {
    console.error("❌ Errore durante il popolamento:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
