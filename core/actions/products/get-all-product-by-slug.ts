import { prisma } from "@/core/prisma/prisma";
import { convertToPlainObject } from "@/lib/utils";

// Tipizzazione dei query params
export type IQueryParams = {
  [key: string]: string;
};

// Funzione ricorsiva per ottenere tutte le sottocategorie di una categoria
async function getAllSubCategoryIds(parentId: string): Promise<string[]> {
  const subCategories = await prisma.category.findMany({
    where: { parentId },
    select: { id: true },
  });

  if (subCategories.length === 0) return []; // Nessuna sottocategoria

  const subCategoryIds = subCategories.map((c) => c.id);
  const deepSubCategoryIds = await Promise.all(
    subCategoryIds.map((id) => getAllSubCategoryIds(id))
  );

  return subCategoryIds.concat(deepSubCategoryIds.flat());
}

// Trova la categoria principale associata a categoryType
async function getMainCategory(categorySlug: string) {
  const category = await prisma.category.findFirst({
    where: {
      slug: categorySlug,
    },
    select: { id: true, parentId: true },
  });

  console.log(
    `🔍 Categoria principale trovata per slug "${categorySlug}":`,
    category
  );

  return convertToPlainObject(category);
}

// Ottieni tutti i prodotti per categoryType e sottocategorie
export async function getAllProductsBySlug({
  query,
  slug,
}: {
  query: IQueryParams;
  slug: string;
}) {
  try {
    console.log(`🔎 Ricerca prodotti per categoryType: ${slug}`);

    // Trova la categoria principale associata al categoryType
    const mainCategory = await getMainCategory(slug);

    if (!mainCategory) {
      console.warn(`⚠️ Nessuna categoria trovata per slug: ${slug}`);
      return { data: [], totalPages: 0, totalProducts: 0 };
    }

    const subCategoryIds = await getAllSubCategoryIds(mainCategory.id);
    const categoryIds = [mainCategory.id, ...subCategoryIds];

    // Costruzione della query
    const where: any = {
      OR: [
        { categoryType: slug },
        {
          productCategory: {
            some: {
              categoryId: { in: categoryIds },
            },
          },
        },
      ],
    };

    if (query.animalAge) {
      where.animalAge = query.animalAge;
    }

    if (query.productBrand) {
      const productBrand = await prisma.productBrand.findFirst({
        where: { slug: query.productBrand },
        select: { id: true },
      });

      if (productBrand) {
        where.productBrandId = productBrand.id;
      } else {
        console.warn(`⚠️ Nessun brand trovato per slug: ${query.productBrand}`);
      }
    }

    if (query.productFormats) {
      const productFormat = await prisma.productUnitFormat.findFirst({
        where: { slug: query.productFormats },
        select: { id: true },
      });

      if (productFormat) {
        where.productUnitFormatId = productFormat.id;
      } else {
        console.warn(
          `⚠️ Nessun formato trovato per slug: ${query.productFormats}`
        );
      }
    }

    if (query.productPathologies) {
      const productPathology = await prisma.productPathology.findUnique({
        where: { slug: query.productPathologies },
        select: { id: true },
      });

      if (productPathology?.id) {
        where.productPathologyOnProduct = {
          some: {
            pathologyId: productPathology.id,
          },
        };
      } else {
        console.warn(
          `⚠️ Nessuna patologia trovata per slug: ${query.productPathologies}`
        );
      }
    }

    if (query.productProteins) {
      const productProteins = await prisma.productProtein.findUnique({
        where: { slug: query.productProteins },
        select: { id: true },
      });

      if (productProteins?.id) {
        where.productProteinOnProduct = {
          some: {
            productProteinId: productProteins.id,
          },
        };
      } else {
        console.warn(
          `⚠️ Nessuna proteina trovata per slug: ${query.productProteins}`
        );
      }
    }

    if (query.price) {
      const [min, max] = query.price.split("-").map(Number);
      where.price = {
        gte: min || 0,
        lte: max || Number.MAX_SAFE_INTEGER,
      };
    }

    // Trova i prodotti filtrati
    const data = await prisma.product.findMany({
      where,
      include: {
        productCategory: {
          include: {
            category: true,
          },
        },
        productUnitFormat: {
          include: {
            unitValue: true,
            unitOfMeasure: true,
          },
        },
        productBrand: true,
        orderitems: true,

        productPathologyOnProduct: {
          include: { pathology: true },
        },
        productsFeatureOnProduct: {
          include: { productFeature: true },
        },

        productProteinOnProduct: {
          include: { productProtein: true },
        },
      },
      orderBy:
        query.sort === "lowest"
          ? { price: "asc" }
          : query.sort === "highest"
            ? { price: "desc" }
            : query.sort === "rating"
              ? { rating: "desc" }
              : { createdAt: "desc" },
    });

    console.log(`✅ Trovati ${data.length} prodotti.`);

    // Formatta i dati
    const updatedData = data.map((item) => ({
      ...item,
      category: item.productCategory?.length
        ? item.productCategory.map((pc) => pc.category.name).join(", ")
        : "N/A",
      productBrand: item.productBrand ? item.productBrand.name : null,
      productUnitFormat: item.productUnitFormat
        ? {
            id: item.productUnitFormat.id,
            unitValue: item.productUnitFormat.unitValue.value,
            unitOfMeasure: item.productUnitFormat.unitOfMeasure.code,
            slug: item.productUnitFormat.slug,
          }
        : null,
      productPathologies: item.productPathologyOnProduct.map((p) => ({
        id: p.pathology.id,
        name: p.pathology.name,
      })),
      productFeatures: item.productsFeatureOnProduct.map((f) => ({
        id: f.productFeature.id,
        name: f.productFeature.name,
      })),
      productProteins: item.productProteinOnProduct.map((p) => ({
        id: p.productProtein.id,
        name: p.productProtein.name,
      })),
    }));

    return convertToPlainObject(updatedData);
  } catch (error) {
    console.error("❌ Errore durante il fetch dei prodotti:", error);
    return { data: [], totalPages: 0, totalProducts: 0 };
  }
}
