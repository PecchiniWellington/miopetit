"use server";
// actions/animals/deleteAnimal.ts
import { prisma } from "@/core/prisma/prisma";
import { convertToPlainObject } from "@/lib/utils";

export async function deleteAnimal(id: string) {
  const animal = await prisma.animal.delete({
    where: { id },
  });

  return convertToPlainObject(animal);
}
