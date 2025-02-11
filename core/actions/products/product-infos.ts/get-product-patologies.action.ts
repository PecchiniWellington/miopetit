import { prisma } from "@/core/prisma/prisma";
import { convertToPlainObject, formatValidationError } from "@/lib/utils";

export async function getAllPathologies() {
  try {
    const pathologies = await prisma.productPathology.findMany();
    return {
      data: pathologies,
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
    const patology = await prisma.productPathology.findFirst({
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
