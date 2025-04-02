// actions/animals/createAnimal.ts
import { prisma } from "@/core/prisma/prisma";
import { convertToPlainObject } from "@/lib/utils";
import { AnimalStatus, Gender } from "@prisma/client";

export async function createAnimal(data: {
  name: string;
  microchipCode: string;
  breed: string;
  gender: Gender;
  age: number;
  intakeDate: Date;
  origin: string;
  description?: string;
  status: AnimalStatus;
  photoUrl?: string;
  contributorId: string;
}) {
  const animal = await prisma.animal.create({
    data,
  });

  return convertToPlainObject(animal);
}
