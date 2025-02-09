import { prisma } from "@/core/prisma/prisma";
import { ICategory } from "@/core/validators";
import { formatError } from "@/lib/utils";

export async function getCategoryById(id: string) {
  try {
    const data: ICategory | null = await prisma.category.findFirst({
      where: {
        id: id,
      },
    });
    return {
      data,
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
