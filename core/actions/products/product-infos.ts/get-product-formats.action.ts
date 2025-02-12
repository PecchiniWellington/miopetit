"use server";
import { prisma } from "@/core/prisma/prisma";
import { formatValidationError } from "@/lib/utils";

export async function getAllFormats() {
  try {
    const unitOfMeasure = await prisma.productUnitFormat.findMany({
      include: {
        unitOfMeasure: true,
        unitValue: true,
      },
    });

    return unitOfMeasure;
  } catch (error) {
    if (error instanceof Error) {
      formatValidationError(error.message);
    } else {
      throw error;
    }
  }
}
export async function getUnitValue() {
  try {
    const unitValue = await prisma.unitValue.findMany({});

    return unitValue;
  } catch (error) {
    if (error instanceof Error) {
      formatValidationError(error.message);
    } else {
      throw error;
    }
  }
}
export async function getUnitOfMeasure() {
  try {
    const unitOfMeasure = await prisma.unitOfMeasure.findMany({});

    return unitOfMeasure;
  } catch (error) {
    if (error instanceof Error) {
      formatValidationError(error.message);
    } else {
      throw error;
    }
  }
}
