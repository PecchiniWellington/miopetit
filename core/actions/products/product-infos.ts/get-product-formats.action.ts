"use server";
import { prisma } from "@/core/prisma/prisma";
import { convertToPlainObject, formatValidationError } from "@/lib/utils";

export async function getAllFormats() {
  try {
    const unitOfMeasure = await prisma.productUnitFormat.findMany({
      include: {
        unitOfMeasure: true,
        unitValue: true,
        products: true,
      },
    });

    return convertToPlainObject(unitOfMeasure);
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

    return convertToPlainObject(unitValue);
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

    return convertToPlainObject(unitOfMeasure);
  } catch (error) {
    if (error instanceof Error) {
      formatValidationError(error.message);
    } else {
      throw error;
    }
  }
}
