"use server";
// actions/animals/deleteAnimal.ts
import { prisma } from "@/core/prisma/prisma";
import { convertToPlainObject } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function deleteAnimal(id: string) {
  const animal = await prisma.animal.delete({
    where: { id },
  });
  revalidatePath("/admin/animals/all");
  revalidatePath("/admin/animals/cats");
  revalidatePath("/admin/animals/dogs");
  revalidatePath("/admin/animals/small-animals");

  return convertToPlainObject(animal);
}
