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

    // 🔹 Mappa UnitOfMeasure univoche
    const uniqueUnitMeasures = [
      ...new Map(
        unitOfMeasure.map((format) => [
          format.unitOfMeasure.id,
          {
            value: format.unitOfMeasure.id,
            label: format.unitOfMeasure.name,
          },
        ])
      ).values(),
    ];

    // 🔹 Mappa UnitValue univoci
    const uniqueUnitValues = [
      ...new Map(
        unitOfMeasure.map((format) => [
          format.unitValue.id,
          {
            value: format.unitValue.id,
            label: format.unitValue.value.toString(),
          },
        ])
      ).values(),
    ];

    console.log("✅ Unique Unit Measures:", uniqueUnitMeasures);
    console.log("✅ Unique Unit Values:", uniqueUnitValues);

    return {
      unitOfMeasure: uniqueUnitMeasures,
      unitValue: uniqueUnitValues,
    };
  } catch (error) {
    if (error instanceof Error) {
      formatValidationError(error.message);
    } else {
      throw error;
    }
  }
}
