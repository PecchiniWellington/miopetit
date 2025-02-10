import { prisma } from "@/core/prisma/prisma";
import { convertToPlainObject, formatValidationError } from "@/lib/utils";

export async function getAllBrands() {
  try {
    const brands = await prisma.productBrand.findMany();
    return {
      data: brands,
    };
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
    const brand = await prisma.productBrand.findFirst({
      where: {
        id: productId,
      },
    });
    return convertToPlainObject(brand);
  } catch (error) {
    if (error instanceof Error) {
      formatValidationError(error.message);
    } else {
      throw error;
    }
  }
}
