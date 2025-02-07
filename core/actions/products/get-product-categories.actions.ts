import { prisma } from "@/core/prisma/prisma";
import { getAllCategories } from "../admin/admin.actions";

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

  return result;
}
