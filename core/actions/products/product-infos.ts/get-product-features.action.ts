"use server";
import { prisma } from "@/core/prisma/prisma";
import { convertToPlainObject, formatValidationError } from "@/lib/utils";

export async function getAllFeatures() {
  try {
    const features = await prisma.productFeatureOnProduct.findMany({
      include: {
        productFeature: true,
        product: true,
      },
      distinct: ["productFeatureId"],
    });
    return convertToPlainObject(features);
  } catch (error) {
    if (error instanceof Error) {
      formatValidationError(error.message);
    } else {
      throw error;
    }
  }
}
