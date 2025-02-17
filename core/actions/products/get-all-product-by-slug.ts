import { prisma } from "@/core/prisma/prisma";
import { convertToPlainObject } from "@/lib/utils";
import console from "console";

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

// Ottieni tutti i prodotti per categoria e sottocategorie, con filtri dinamici
export async function getAllProductsBySlug({
  query,
  slug,
}: {
  query: IQueryParams;
  slug: string;
}) {
  try {
    console.log(
      `🔍 Ricerca prodotti per categoria: ${slug}, con query:`,
      query
    );

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

    // Costruisce dinamicamente il filtro WHERE in base ai parametri ricevuti
    const where: any = {
      productCategory: {
        some: {
          categoryId: { in: categoryIds }, // Filtra per categoria
        },
      },
    };

    // Applica filtri dinamici
    if (query.animalAge) {
      where.animalAge = query.animalAge; // Filtra per età dell'animale
    }

    if (query.brand) {
      where.productBrand = {
        some: {
          id: query.brand,
        },
      };
    }

    if (query.unit) {
      where.productUnitFormat = {
        some: {
          unitValue: { equals: parseFloat(query.unit) },
        },
      };
    }

    if (query.pathologies) {
      where.productPathologies = {
        some: {
          id: query.pathologies,
        },
      };
    }

    if (query.price) {
      const [min, max] = query.price.split("-").map(Number);
      where.price = {
        gte: min || 0,
        lte: max || Number.MAX_SAFE_INTEGER,
      };
    }

    console.log("🔎 Filtro applicato:", where);

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
      },
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
    };
  } catch (error) {
    console.error("❌ Errore durante il fetch dei prodotti:", error);
    return { data: [], totalPages: 0, totalProducts: 0 };
  }
}
