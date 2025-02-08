import { prisma } from "@/core/prisma/prisma";
import { convertToPlainObject, formatValidationError } from "@/lib/utils";

export async function getAllBrands() {
  try {
    const product = await prisma.productBrand.findMany();
    return convertToPlainObject(product);
  } catch (error) {
    if (error instanceof Error) {
      formatValidationError(error.message);
    } else {
      throw error;
    }
  }
}

export async function getProductBrandByProductId(productId: string) {
  try {
    const product = await prisma.productBrand.findFirst({
      where: {
        id: productId,
      },
    });
    return convertToPlainObject(product);
  } catch (error) {
    if (error instanceof Error) {
      formatValidationError(error.message);
    } else {
      throw error;
    }
  }
}
