"use server";
import { prisma } from "@/core/prisma/prisma";
import { updateAnimalSchema } from "@/core/validators/animal.validator";
import { convertToPlainObject } from "@/lib/utils";

export const getAnimalById = async (animalId: string) => {
  const animal = await prisma.animal.findUnique({
    where: {
      id: animalId,
    },
  });

  if (!animal) return null;

  const animalWithFormattedDate = {
    ...animal,
    intakeDate: animal.intakeDate.toISOString().split("T")[0], // formato YYYY-MM-DD
  };

  const result = updateAnimalSchema.safeParse(animalWithFormattedDate);

  if (!result.success) {
    console.error("❌ Errore di validazione animale:", result.error.format());
    return null;
  }

  return convertToPlainObject(result.data);
};
