import { prisma } from "@/core/prisma/prisma";
import { convertToPlainObject, formatValidationError } from "@/lib/utils";

/* GET ALL CATEGORIES */
export async function getAllCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        Product: true,
      },
    });

    const dataCount = await prisma.category.count();

    return {
      data: convertToPlainObject(categories),
      totalPages: Math.ceil(dataCount / 4),
      productCount: categories.reduce(
        (acc, category) => acc + category.Product.length,
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

/* GET PRODUCTCATEGORY */
export async function getProductCategories() {
  const data = await prisma.product.groupBy({
    by: ["categoryId"],
    _count: true,
  });

  const categories = await getAllCategories();
  const categoryMap = categories?.data?.reduce(
    (acc, cat) => {
      acc[cat.id] = { id: cat.id, name: cat.name, slug: cat.slug };
      return acc;
    },
    {} as Record<string, { id: string; name: string; slug: string }>
  );

  const result = data.map((item) => ({
    ...item,
    category: categoryMap?.[item.categoryId!] ?? {
      id: "N/A",
      name: "N/A",
      slug: "N/A",
    },
  }));

  return convertToPlainObject(result);
}
