import { prisma } from "@/core/prisma/prisma";
import productsData from "../product";

type AnimalAge = "PUPPY" | "ADULT" | "SENIOR";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createProducts(productUnitFormats: any[]) {
  console.log(`⏳ Creating products...`);

  const categories = await prisma.category.findMany({
    select: { id: true, slug: true },
  });
  const productFeatures = await prisma.productFeatures.findMany({
    select: { id: true },
  });
  const brands = await prisma.productBrand.findMany({ select: { id: true } });
  const proteins = await prisma.productProtein.findMany({
    select: { id: true },
  });
  const pathologies = await prisma.productPathology.findMany({
    select: { id: true },
  });

  for (const product of productsData) {
    const randomCategory =
      categories[Math.floor(Math.random() * categories.length)];
    const randomBrand = brands[Math.floor(Math.random() * brands.length)];
    const selectedProteins = proteins
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 3) + 1);
    const selectedFeatures = productFeatures
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 3) + 1);
    const selectedPathologies = pathologies
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.min(3, pathologies.length));
    const randomUnitFormat =
      productUnitFormats[Math.floor(Math.random() * productUnitFormats.length)];
    const randomAge: AnimalAge = ["PUPPY", "ADULT", "SENIOR"][
      Math.floor(Math.random() * 3)
    ] as AnimalAge;

    await prisma.product.create({
      data: {
        ...product,
        animalAge: randomAge,
        categoryType: randomCategory.slug,
        productCategory: {
          create: { category: { connect: { id: randomCategory.id } } },
        },
        productBrand: { connect: { id: randomBrand.id } },
        productsFeatureOnProduct: {
          create: selectedFeatures.map((f) => ({
            productFeature: { connect: { id: f.id } },
          })),
        },
        productUnitFormat: { connect: { id: randomUnitFormat.id } },
        productProteinOnProduct: {
          create: selectedProteins.map((p) => ({
            productProtein: { connect: { id: p.id } },
          })),
        },
        productPathologyOnProduct: {
          create: selectedPathologies.map((p) => ({
            pathology: { connect: { id: p.id } },
          })),
        },
        productPathologyId: selectedPathologies.length
          ? selectedPathologies[0].id
          : null,
      },
    });
  }
  console.log(`✅ Products created successfully.`);
}
