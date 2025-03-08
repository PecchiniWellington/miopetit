/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/core/prisma/prisma";

// ✅ Funzione per creare le categorie in modo ricorsivo
export async function createCategories(
  categories: any[],
  parentId: string | null = null
) {
  for (const category of categories) {
    const createdCategory = await prisma.category.create({
      data: { name: category.name, slug: category.slug, parentId },
    });

    if (category.children && category.children.length > 0) {
      await createCategories(category.children, createdCategory.id);
    }
  }
}
