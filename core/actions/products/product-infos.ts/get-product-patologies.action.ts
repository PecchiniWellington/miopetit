import { prisma } from "@/core/prisma/prisma";
import { convertToPlainObject, formatValidationError } from "@/lib/utils";

export async function getAllPathologies() {
  try {
    const patologies = await prisma.productPatology.findMany();
    return {
      data: patologies,
    };
  } catch (error) {
    if (error instanceof Error) {
      formatValidationError(error.message);
    } else {
      throw error;
    }
  }
}

export async function getProductPatologyByProductId(productId: string) {
  try {
    const patology = await prisma.productPatology.findFirst({
      where: {
        id: productId,
      },
    });
    return convertToPlainObject(patology);
  } catch (error) {
    if (error instanceof Error) {
      formatValidationError(error.message);
    } else {
      throw error;
    }
  }
}
