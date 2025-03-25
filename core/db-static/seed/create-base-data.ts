import { prisma } from "@/core/prisma/prisma";
import contributorsData from "../contributors";
import productBrand from "../product-brand";
import productFeaturesData from "../product-feature";
import productPathology from "../product-pathology";
import productProteins from "../product-proteins";
import unitOfMeasureData from "../unit-of-measure";
import unitValuesData from "../unit-value";
import usersData from "../users";
import { ContributorType } from "@prisma/client";

export async function createBaseData() {
  console.log(`⏳ Creating base data...`);

  await prisma.unitValue.createMany({ data: unitValuesData });
  await prisma.unitOfMeasure.createMany({ data: unitOfMeasureData });
  await prisma.user.createMany({ data: usersData });

  // Recupera tutti gli utenti con ruolo "CONTRIBUTOR"
  const contributorUsers = await prisma.user.findMany({
    where: { role: "CONTRIBUTOR" },
    select: { id: true },
  });

  // Se il numero di contributor !== numero utenti con ruolo CONTRIBUTOR, logga warning
  if (contributorUsers.length !== contributorsData.length) {
    console.warn(
      "⚠️ Mismatch tra utenti con ruolo CONTRIBUTOR e contributorsData!"
    );
  }

  // Associa userId a ciascun contributor
  const enrichedContributors = contributorsData.map((contributor, index) => ({
    ...contributor,
    userId: contributorUsers[index]?.id,
    type: contributor.type.toUpperCase() as ContributorType, // 👈 forza il tipo a enum valido
  }));

  await prisma.contributor.createMany({
    data: enrichedContributors,
    skipDuplicates: true,
  });

  await prisma.productProtein.createMany({ data: productProteins });

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

  console.log(`✅ All base data created successfully.`);
}
