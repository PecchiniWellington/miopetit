import { PrismaClient } from "@prisma/client";
import console from "console";
import categoryData from "./category";
import productsData from "./product";
import productBrand from "./product-brand";
import productFeaturesData from "./product-feature";
import productPathology from "./product-pathology";
import productProteins from "./product-proteins";
import unitOfMeasureData from "./unit-of-measure";
import unitValuesData from "./unit-value";
import usersData from "./users";

const prisma = new PrismaClient();

async function main() {
  /* DELETE ALL RECORDS */
  console.log(`✅ Start deleting all previous tables...`);
  await prisma.productProteinOnProduct.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.productProtein.deleteMany();
  await prisma.productFeatures.deleteMany();
  await prisma.productPathology.deleteMany();
  await prisma.productBrand.deleteMany();
  await prisma.productFeatures.deleteMany();
  await prisma.user.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.unitValue.deleteMany();
  await prisma.unitOfMeasure.deleteMany();
  console.log(`✅ Deleted all previous tables`);

  /* CREATE OTHER DATA */
  await prisma.unitValue.createMany({ data: unitValuesData });
  console.log(`✅ UnitValue created`);
  await prisma.unitOfMeasure.createMany({ data: unitOfMeasureData });
  console.log(`✅ unitOfMeasure created`);
  await prisma.category.createMany({ data: categoryData });
  console.log(`✅ Categories created`);
  await prisma.user.createMany({ data: usersData });
  console.log(`✅ Users created`);
  await prisma.productProtein.createMany({ data: productProteins });
  console.log(`✅ ProductProtein created`);
  await prisma.productFeatures.createMany({ data: productFeaturesData });
  console.log(`✅ productFeatures created`);
  await prisma.productPathology.createMany({ data: productPathology });
  console.log(`✅ ProductPathology created`);
  await prisma.productBrand.createMany({ data: productBrand });
  console.log(`✅ ProductBrand created`);

  // 📌 Retrieve the IDs
  const categories = await prisma.category.findMany({ select: { id: true } });
  const productFeatures = await prisma.productFeatures.findMany({
    select: { id: true },
  });
  const brandData = await prisma.productBrand.findMany({
    select: { id: true },
  });
  const productProteinsData = await prisma.productProtein.findMany({
    select: { id: true },
  });
  const unitValues = await prisma.unitValue.findMany({
    select: { id: true, value: true },
  });
  const unitMeasures = await prisma.unitOfMeasure.findMany({
    select: { id: true },
  });

  console.log(`⏳ Start creating productUnitFormats...`);
  const productUnitFormats = await Promise.all(
    unitValues.map(async (unitValue) => {
      const randomUnitMeasure =
        unitMeasures[Math.floor(Math.random() * unitMeasures.length)];
      return await prisma.productUnitFormat.create({
        data: {
          unitValueId: unitValue.id,
          unitMeasureId: randomUnitMeasure.id,
        },
      });
    })
  );
  console.log(`✅ ProductUnitFormats created`);

  console.log(`⏳ Start creating products...`);
  for (const product of productsData) {
    const numRandom = Math.floor(Math.random() * 3) + 1;

    const selectedProteins = productProteinsData
      .sort(() => 0.5 - Math.random())
      .slice(0, numRandom);

    const selectedFeature = productFeatures
      .sort(() => 0.5 - Math.random())
      .slice(0, numRandom);

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
        productsFeatureOnProduct: {
          create: selectedFeature.map((feature) => ({
            productFeature: { connect: { id: feature.id } },
          })),
        },
        productUnitFormat: {
          connect: {
            id: randomProductUnitFormat.id,
          },
        },
        productProteinOnProduct: {
          create: selectedProteins.map((protein) => ({
            productProtein: { connect: { id: protein.id } },
          })),
        },
      },
    });

    console.log(
      `→   ✅ Created product: ${createdProduct.name} with ${selectedProteins.length} proteins and unit value }`
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
