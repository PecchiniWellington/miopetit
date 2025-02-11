"use server";
import { prisma } from "@/core/prisma/prisma";
import { formatValidationError } from "@/lib/utils";

export async function getAllFormats() {
  try {
    const unitOfMeasure = await prisma.productUnitFormat.findMany({
      include: {
        unitValue: true,
        unitOfMeasure: true,
        products: {
          select: { id: true, name: true },
        },
      },
    });

    return {
      unitOfMeasure,
    };
  } catch (error) {
    if (error instanceof Error) {
      formatValidationError(error.message);
    } else {
      throw error;
    }
  }
}
