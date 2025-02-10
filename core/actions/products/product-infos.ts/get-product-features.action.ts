import { prisma } from "@/core/prisma/prisma";
import { convertToPlainObject, formatValidationError } from "@/lib/utils";

export async function getAllFeatures() {
  try {
    const features = await prisma.productFeatures.findMany();
    return convertToPlainObject(features);
  } catch (error) {
    if (error instanceof Error) {
      formatValidationError(error.message);
    } else {
      throw error;
    }
  }
}

export async function getFeaturesBrandByProductId(productId: string) {
  try {
    const feature = await prisma.productFeatures.findFirst({
      where: {
        id: productId,
      },
    });
    return convertToPlainObject(feature);
  } catch (error) {
    if (error instanceof Error) {
      formatValidationError(error.message);
    } else {
      throw error;
    }
  }
}
