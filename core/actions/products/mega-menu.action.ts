import { prisma } from "@/core/prisma/prisma";
import { ICategory } from "@/core/validators";

export async function getAllCategoriesForMegaMenu(mainCategorySlug: string) {
  // Trova la categoria principale (es. "gatti")
  const mainCategory = await prisma.category.findFirst({
    where: { slug: mainCategorySlug },
    include: { children: true },
  });

  if (!mainCategory) return null;

  // Funzione ricorsiva per costruire la struttura annidata

  async function getChildren(category: {
    id: string;
    name: string;
    slug: string;
    parentId: string | null;
  }): Promise<{
    id: string;
    name: string;
    slug: string;
    children: ICategory[];
  }> {
    const children = await prisma.category.findMany({
      where: { parentId: category.id.toString() },
      include: { children: true }, // Carica i figli di questa categoria
    });

    return {
      id: category.id,
      name: category.name,
      slug: category.slug,
      children: await Promise.all(children.map(getChildren)), // Richiama sé stessa sui figli
    };
  }

  return getChildren(mainCategory);
}
