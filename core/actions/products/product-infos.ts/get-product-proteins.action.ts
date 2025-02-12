import { prisma } from "@/core/prisma/prisma";
import { convertToPlainObject, formatValidationError } from "@/lib/utils";

export async function getAllProtein() {
  try {
    const proteine = await prisma.productProtein.findMany();
    return convertToPlainObject(proteine);
  } catch (error) {
    if (error instanceof Error) {
      formatValidationError(error.message);
    } else {
      throw error;
    }
  }
}

export async function getProteinByProductId(productId: string) {
  try {
    const proteine = await prisma.productProtein.findFirst({
      where: {
        id: productId,
      },
    });
    return convertToPlainObject(proteine);
  } catch (error) {
    if (error instanceof Error) {
      formatValidationError(error.message);
    } else {
      throw error;
    }
  }
}
