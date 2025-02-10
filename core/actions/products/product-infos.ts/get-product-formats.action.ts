import { prisma } from "@/core/prisma/prisma";
import { convertToPlainObject, formatValidationError } from "@/lib/utils";

export async function getAllFormats() {
  try {
    const formats = await prisma.productFormat.findMany();
    return convertToPlainObject(formats);
  } catch (error) {
    if (error instanceof Error) {
      formatValidationError(error.message);
    } else {
      throw error;
    }
  }
}

export async function getProductFormatByProductId(productId: string) {
  try {
    const format = await prisma.productFormat.findFirst({
      where: {
        id: productId,
      },
    });
    return convertToPlainObject(format);
  } catch (error) {
    if (error instanceof Error) {
      formatValidationError(error.message);
    } else {
      throw error;
    }
  }
}
