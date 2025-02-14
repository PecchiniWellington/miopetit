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
