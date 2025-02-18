import { prisma } from "@/core/prisma/prisma";
import { convertToPlainObject, formatValidationError } from "@/lib/utils";

export async function getFavorites(userId: string) {
  try {
    if (!userId) return { success: false, error: "User not found" };

    const favorites = await prisma.favorite.findMany({ where: { userId } });
    return convertToPlainObject(favorites);
  } catch (error) {
    if (error instanceof Error) {
      formatValidationError(error.message);
    } else {
      throw error;
    }
  }
}

export async function createFavorites(userId: string, productId: string) {
  try {
    if (!userId || !productId)
      return { success: false, error: "Missing Parameters" };

    const favorites = await prisma.favorite.create({
      data: { userId, productId },
    });
    return convertToPlainObject(favorites);
  } catch (error) {
    if (error instanceof Error) {
      formatValidationError(error.message);
    } else {
      throw error;
    }
  }
}
