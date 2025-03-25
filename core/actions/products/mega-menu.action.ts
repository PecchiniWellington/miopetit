import { prisma } from "@/core/prisma/prisma";
import { ICategory } from "@/core/validators";

export async function getAllCategoriesForMegaMenu(mainCategorySlug: string) {
  const mainCategory = await prisma.category.findFirst({
    where: { slug: mainCategorySlug },
    include: { children: true },
  });

  if (!mainCategory) return null;

  async function getChildren(category: {
    id: string;
    name: string;
    slug: string;
    parentId?: string | null;
  }): Promise<{
    id: string;
    name: string;
    slug: string;
    children: ICategory[];
  }> {
    const children = await prisma.category.findMany({
      where: { parentId: category.id.toString() },
      include: { children: true },
    });

    return {
      id: category.id,
      name: category.name,
      slug: category.slug,
      children: await Promise.all(children.map(getChildren)),
    };
  }

  return getChildren(mainCategory);
}
