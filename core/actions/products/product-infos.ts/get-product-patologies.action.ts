"use server";
import { prisma } from "@/core/prisma/prisma";
import { convertToPlainObject, formatValidationError } from "@/lib/utils";

export async function getAllPathologies() {
  try {
    const pathologies = await prisma.productPathology.findMany();
    return convertToPlainObject(pathologies);
  } catch (error) {
    if (error instanceof Error) {
      formatValidationError(error.message);
    } else {
      throw error;
    }
  }
}

export async function getProductPathologyByProductId(productId: string) {
  try {
    const pathology = await prisma.productPathology.findFirst({
      where: {
        id: productId,
      },
    });
    return convertToPlainObject(pathology);
  } catch (error) {
    if (error instanceof Error) {
      formatValidationError(error.message);
    } else {
      throw error;
    }
  }
}
