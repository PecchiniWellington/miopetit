import { prisma } from "@/core/prisma/prisma";
import { PAGE_SIZE } from "@/lib/constants";
import { convertToPlainObject } from "@/lib/utils";
import { Prisma } from "@prisma/client";

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

// Ottieni tutti i prodotti per categoria e sottocategorie
export async function getAllProductsBySlug({
  query,
  slug,
  limit = PAGE_SIZE,
  page,
  price,
  rating,
  sort,
}: {
  query: string;
  slug: string;
  limit?: number;
  page: number;
  price?: string;
  rating?: string;
  sort?: string;
}) {
  try {
    // Trova la categoria principale tramite slug
    const mainCategory = await prisma.category.findFirst({
      where: { slug },
      select: { id: true },
    });

    if (!mainCategory) {
      console.warn(`⚠️ Nessuna categoria trovata per slug: ${slug}`);
      return { data: [], totalPages: 0, totalProducts: 0 };
    }

    console.log(`✅ Categoria principale trovata: ${mainCategory.id}`);

    // Trova tutte le sottocategorie ricorsivamente
    const subCategoryIds = await getAllSubCategoryIds(mainCategory.id);
    const categoryIds = [mainCategory.id, ...subCategoryIds];

    console.log(`✅ Trovate ${categoryIds.length} categorie associate.`);

    // Filtri
    const queryFilter: Prisma.ProductWhereInput =
      query && query !== "all"
        ? {
            name: {
              contains: query,
              mode: "insensitive",
            } as Prisma.StringFilter,
          }
        : {};

    const categoryFilter: Prisma.ProductWhereInput = {
      productCategory: {
        some: {
          categoryId: { in: categoryIds },
        },
      },
    };

    const priceFilter: Prisma.ProductWhereInput =
      price && price.includes("-")
        ? {
            price: {
              gte: parseFloat(price.split("-")[0]) || 0,
              lte: parseFloat(price.split("-")[1]) || Infinity,
            },
          }
        : {};

    const ratingFilter: Prisma.ProductWhereInput =
      rating && !isNaN(Number(rating))
        ? {
            rating: {
              gte: parseFloat(rating),
            },
          }
        : {};

    // Trova i prodotti filtrati
    const data = await prisma.product.findMany({
      where: {
        ...queryFilter,
        ...categoryFilter,
        ...priceFilter,
        ...ratingFilter,
      },
      include: {
        productCategory: {
          include: {
            category: true, // Include le categorie associate ai prodotti
          },
        },
        productUnitFormat: {
          include: {
            unitValue: true,
            unitOfMeasure: true,
          },
        },
        productBrand: true,
      },
      orderBy:
        sort === "lowest"
          ? { price: "asc" }
          : sort === "highest"
            ? { price: "desc" }
            : sort === "rating"
              ? { rating: "desc" }
              : { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    });

    // Conta il numero totale di prodotti
    const productCount = await prisma.product.count({
      where: categoryFilter,
    });

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
          }
        : null,
    }));

    return {
      data: convertToPlainObject(updatedData),
      totalPages: Math.ceil(productCount / limit),
      totalProducts: productCount,
    };
  } catch (error) {
    console.error("❌ Errore durante il fetch dei prodotti:", error);
    return { data: [], totalPages: 0, totalProducts: 0 };
  }
}
