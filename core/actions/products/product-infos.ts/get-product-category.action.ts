import { prisma } from "@/core/prisma/prisma";
import { convertToPlainObject, formatValidationError } from "@/lib/utils";

/* GET ALL CATEGORIES CON GERARCHIA */
export async function getAllCategories() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        children: true, // Recupera le sottocategorie
        productCategory: {
          include: {
            product: true,
          },
        },
      },
    });

    // Conta i prodotti unici per ogni categoria usando Set()
    const categoriesWithCount = categories.map((cat) => ({
      ...cat,
      productCount: new Set(cat.productCategory.map((pc) => pc.productId)).size,
    }));

    return {
      data: convertToPlainObject(categoriesWithCount),
      totalProductCount: categoriesWithCount.reduce(
        (acc, cat) => acc + cat.productCount,
        0
      ),
    };
  } catch (error) {
    return {
      success: false,
      error: formatValidationError((error as Error).message),
    };
  }
}

/* GET CATEGORY CON I PRODOTTI */
export async function getCategoryWithProducts(categorySlug: string) {
  try {
    // Trova la categoria specifica con le sue sottocategorie e prodotti
    const category = await prisma.category.findUnique({
      where: { slug: categorySlug },
      include: {
        children: true,
        productCategory: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!category) {
      return {
        success: false,
        error: "Categoria non trovata",
      };
    }

    return {
      data: convertToPlainObject(category),
      totalProductCount: new Set(
        category.productCategory.map((pc) => pc.productId)
      ).size,
    };
  } catch (error) {
    return {
      success: false,
      error: formatValidationError((error as Error).message),
    };
  }
}

/* GET PRODUCTCATEGORY CON COUNT */
export async function getProductCategories() {
  try {
    // ✅ Raggruppiamo i prodotti per categoria usando `groupBy`
    const data = await prisma.productCategory.groupBy({
      by: ["categoryId"],
      _count: {
        productId: true,
      },
    });

    // ✅ Otteniamo tutte le categorie disponibili
    const categories = await getAllCategories();
    const categoryMap = categories?.data?.reduce(
      (acc, cat) => {
        acc[cat.id] = { id: cat.id, name: cat.name, slug: cat.slug };
        return acc;
      },
      {} as Record<string, { id: string; name: string; slug: string }>
    );

    // ✅ Creiamo il risultato finale con i dati completi delle categorie
    const result = data.map((item) => ({
      category: categoryMap?.[item.categoryId] ?? {
        id: "N/A",
        name: "N/A",
        slug: "N/A",
      },
      productCount: item._count.productId, // Numero di prodotti per questa categoria
    }));

    return convertToPlainObject(result);
  } catch (error) {
    return {
      success: false,
      error: formatValidationError((error as Error).message),
    };
  }
}
export async function getCategoryProductIds(categorySlug: string) {
  // Trova la categoria principale
  const mainCategory = await prisma.category.findFirst({
    where: { slug: categorySlug },
    select: { id: true },
  });

  if (!mainCategory) return [];

  // 🔍 Funzione ricorsiva per ottenere tutte le sottocategorie
  async function getAllSubCategoryIds(parentId: string) {
    const subCategories = await prisma.category.findMany({
      where: { parentId: parentId },
      select: { id: true },
    });

    if (subCategories.length === 0) return []; // Se non ci sono figli, ritorna array vuoto

    // 🔄 Prendi i figli dei figli in modo ricorsivo
    const subCategoryIds = subCategories.map((c) => c.id);
    const deepSubCategoryIds: string[] = await Promise.all(
      subCategoryIds.map((id) => getAllSubCategoryIds(id))
    ).then((results) => results.flat());

    return subCategoryIds.concat(deepSubCategoryIds.flat()); // 🔗 Unisce tutte le categorie
  }

  // 🔥 Trova tutte le sottocategorie
  const allCategoryIds = [
    mainCategory.id,
    ...(await getAllSubCategoryIds(mainCategory.id)),
  ];

  // 🏷️ Trova tutti i prodotti associati a queste categorie
  const productCategories = await prisma.productCategory.findMany({
    where: { categoryId: { in: allCategoryIds } },
    select: { productId: true },
  });

  return productCategories.map((pc) => pc.productId);
}

export async function getFiltersForCategory(categorySlug: string) {
  const productIds = await getCategoryProductIds(categorySlug);

  if (productIds.length === 0) return {}; // Se non ci sono prodotti, nessun filtro

  const filters = await prisma.product.groupBy({
    by: [
      "animalAge",
      "productBrandId",
      "productUnitFormatId",
      "productPathologyId",
    ] as const,
    where: { id: { in: productIds } },
    _min: { price: true },
    _max: { price: true },
  });

  return convertToPlainObject({
    age: Array.from(new Set(filters.map((f) => f.animalAge))),
    unit: (
      await prisma.productUnitFormat.findMany({
        where: {
          id: {
            in: Array.from(
              new Set(
                filters
                  .map((f) => f.productUnitFormatId)
                  .filter((id): id is string => id !== null)
              )
            ),
          },
        },
        select: {
          id: true,
          unitValue: { select: { value: true } },
          unitOfMeasure: { select: { code: true } },
        },
      })
    ).map((unit) => ({
      id: unit.id,
      unitValue: unit.unitValue?.value ?? null,
      unitOfMeasure: unit.unitOfMeasure?.code ?? null,
    })),
    brand: await prisma.productBrand.findMany({
      where: {
        id: {
          in: Array.from(
            new Set(
              filters
                .map((f) => f.productBrandId)
                .filter((id): id is string => id !== null)
            )
          ),
        },
      },
      select: { id: true, name: true },
    }),
    pathologies: Array.from(
      new Map(
        (
          await prisma.productPathologyOnProduct.findMany({
            where: {
              productId: { in: productIds },
            },
            select: {
              pathologyId: true,
              pathology: { select: { name: true } },
            },
          })
        ).map((r) => [
          r.pathologyId,
          { id: r.pathologyId, name: r.pathology.name },
        ])
      ).values()
    ),
    price: {
      min: Math.min(
        ...filters.map((f) => parseFloat(f._min?.price?.toString() ?? "0"))
      ),
      max: Math.max(
        ...filters.map((f) => parseFloat(f._max?.price?.toString() ?? "0"))
      ),
    },
  });
}
