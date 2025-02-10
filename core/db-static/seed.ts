/* import { PrismaClient } from "@prisma/client";
import categoryData from "./category";
import productBrand from "./product-brand";
import productFeature from "./product-feature";
import productFormats from "./product-formats";
import productPatology from "./product-patology";
import productProteins from "./product-proteins";
import usersData from "./users";

async function main() {
  const prisma = new PrismaClient();

  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.productProtein.deleteMany();
  await prisma.productFeatures.deleteMany();
  await prisma.productFormat.deleteMany();
  await prisma.productPatology.deleteMany();
  await prisma.productBrand.deleteMany();
  await prisma.user.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();

  await prisma.category.createMany({ data: categoryData.categoryData });
  await prisma.user.createMany({ data: usersData.users });
  await prisma.productProtein.createMany({
    data: productProteins.productProteins,
  });
  await prisma.productFeatures.createMany({
    data: productFeature.productFeatures,
  });
  await prisma.productFormat.createMany({
    data: productFormats.productFormats,
  });
  await prisma.productPatology.createMany({
    data: productPatology.productPatologies,
  });
  await prisma.productBrand.createMany({ data: productBrand.productBrands });

  console.log("Database seeded successfully");
}

main();
 */

import { PrismaClient } from "@prisma/client";
import categoryData from "./category";
import productsData from "./product"; // Assicurati di avere un file con i prodotti
import productBrand from "./product-brand";
import productFeature from "./product-feature";
import productFormats from "./product-formats";
import productPatology from "./product-patology";
import productProteins from "./product-proteins";
import usersData from "./users";

const prisma = new PrismaClient();

async function main() {
  /* DELETE ALL RECORDS */
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.productProtein.deleteMany();
  await prisma.productFeatures.deleteMany();
  await prisma.productFormat.deleteMany();
  await prisma.productPatology.deleteMany();
  await prisma.productBrand.deleteMany();
  await prisma.user.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();

  /* CREATE CATEGORIES */
  const createdCategories = await prisma.category.createMany({
    data: categoryData.categoryData,
  });

  // 📌 Recupera gli ID delle categorie appena create
  const categories = await prisma.category.findMany({ select: { id: true } });

  if (categories.length === 0) {
    throw new Error("No categories found. Seeding failed.");
  }

  /* CREA ALTRI DATI */
  await prisma.user.createMany({ data: usersData.users });
  await prisma.productProtein.createMany({
    data: productProteins.productProteins,
  });
  await prisma.productFeatures.createMany({
    data: productFeature.productFeatures,
  });
  await prisma.productFormat.createMany({
    data: productFormats.productFormats,
  });
  await prisma.productPatology.createMany({
    data: productPatology.productPatologies,
  });
  await prisma.productBrand.createMany({ data: productBrand.productBrands });

  /* CREA I PRODOTTI ASSEGNANDO UN CATEGORY ID RANDOMICO */
  const productsToInsert = productsData.data.map((product) => ({
    ...product,
    categoryId: categories[Math.floor(Math.random() * categories.length)].id, // Assegna un ID casuale
  }));

  await prisma.product.createMany({ data: productsToInsert });

  console.log("Database seeded successfully 🎉");

  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error("Seeding failed:", e);
  await prisma.$disconnect();
  process.exit(1);
});
