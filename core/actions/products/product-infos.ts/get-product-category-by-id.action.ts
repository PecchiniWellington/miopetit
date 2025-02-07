import { prisma } from "@/core/prisma/prisma";
import { formatError } from "@/lib/utils";

export async function getCategoryById(id: string) {
  try {
    const data = await prisma.category.findFirst({
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
