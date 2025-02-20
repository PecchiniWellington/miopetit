import { prisma } from "@/core/prisma/prisma";
import productBrand from "../product-brand";
import productFeaturesData from "../product-feature";
import productPathology from "../product-pathology";
import productProteins from "../product-proteins";
import unitOfMeasureData from "../unit-of-measure";
import unitValuesData from "../unit-value";
import usersData from "../users";

export async function createBaseData() {
  console.log(`⏳ Creating base data...`);
  await prisma.unitValue.createMany({ data: unitValuesData });
  await prisma.unitOfMeasure.createMany({ data: unitOfMeasureData });
  await prisma.user.createMany({ data: usersData });
  await prisma.productProtein.createMany({ data: productProteins });

  // Creazione delle caratteristiche dei prodotti
  console.log(`⏳ Creating unique product features...`);
  for (const feature of productFeaturesData) {
    await prisma.productFeatures.upsert({
      where: { name: feature.name },
      update: {},
      create: feature,
    });
  }
  console.log(`✅ Product features created.`);

  await prisma.productPathology.createMany({ data: productPathology });
  await prisma.productBrand.createMany({ data: productBrand });

  console.log(`✅ Other data created.`);
}
