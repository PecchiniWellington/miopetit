import { PrismaClient } from "@prisma/client";
/* import sampleData from "./sample-data";
 */
import productBrand from "./product-brand";
import productFeature from "./product-feature";
import productFormats from "./product-formats";
import productPatology from "./product-patology";
import productProteins from "./product-proteins";
import usersData from "./users";

async function main() {
  const prisma = new PrismaClient();

  /* Delete first */
  await prisma.product.deleteMany();
  /*   await prisma.category.deleteMany(); */
  await prisma.productProtein.deleteMany();
  await prisma.productFeatures.deleteMany();
  await prisma.productFormat.deleteMany();
  await prisma.productPatology.deleteMany();
  await prisma.productBrand.deleteMany();
  await prisma.user.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();

  /* Create */
  /*  await prisma.category.createMany({ data: categoryData.categoryData }); */
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
  /* await prisma.$disconnect(); */
}

main();
