import { prisma } from "@/core/prisma/prisma";

export async function createRetailerProducts() {
  console.log("🛍️ Creazione prodotti per retailer...");

  const retailers = await prisma.contributor.findMany({
    where: { type: "RETAILER" },
  });

  const categories = await prisma.category.findMany();
  const productFeatures = await prisma.productFeatures.findMany();
  const brands = await prisma.productBrand.findMany();
  const proteins = await prisma.productProtein.findMany();
  const pathologies = await prisma.productPathology.findMany();
  const unitFormats = await prisma.productUnitFormat.findMany();
  const productsData = await prisma.product.findMany();

  for (const retailer of retailers) {
    const selectedProducts = productsData
      .sort(() => 0.5 - Math.random())
      .slice(0, 10);

    for (const product of selectedProducts) {
      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];
      const randomBrand = brands[Math.floor(Math.random() * brands.length)];
      const selectedProteins = proteins
        .sort(() => 0.5 - Math.random())
        .slice(0, 2);
      const selectedFeatures = productFeatures
        .sort(() => 0.5 - Math.random())
        .slice(0, 2);
      const selectedPathologies = pathologies
        .sort(() => 0.5 - Math.random())
        .slice(0, 2);
      const unitFormat =
        unitFormats[Math.floor(Math.random() * unitFormats.length)];

      await prisma.product.create({
        data: {
          ...product,
          contributorId: retailer.id,
          productBrandId: randomBrand.id,
          productCategory: {
            create: {
              category: { connect: { id: randomCategory.id } },
            },
          },
          productUnitFormatId: unitFormat.id,
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
          name: product.name || "Default Product Name",
          slug: product.slug || "default-product-slug",
          animalAge: product.animalAge || "PUPPY",
          categoryType: product.categoryType || "Default Category Type",
        },
      });
    }
  }

  console.log("✅ Prodotti generati per tutti i retailer.");
}
