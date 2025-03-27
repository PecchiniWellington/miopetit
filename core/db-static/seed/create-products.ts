import { prisma } from "@/core/prisma/prisma";
import generateFakeProducts from "../product";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createProducts(productUnitFormats: any[]) {
  console.log(`⏳ Creating products...`);

  const productsData = generateFakeProducts(500);

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

  for (let i = 0; i < productsData.length; i += 10) {
    const batch = productsData.slice(i, i + 10);

    await Promise.all(
      batch.map((product) => {
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
          productUnitFormats[
            Math.floor(Math.random() * productUnitFormats.length)
          ];

        return prisma.product.create({
          data: {
            ...product,
            productCategory: {
              create: { category: { connect: { id: randomCategory.id } } },
            },
            productBrand: { connect: { id: randomBrand.id } },
            productUnitFormat: { connect: { id: randomUnitFormat.id } },
            productsFeatureOnProduct: {
              create: selectedFeatures.map((f) => ({
                productFeature: { connect: { id: f.id } },
              })),
            },
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
            productPathologyId: selectedPathologies[0]?.id || null,
          },
        });
      })
    );
  }

  console.log(`✅ Products created successfully.`);
}
