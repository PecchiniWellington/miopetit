"use server";
import { prisma } from "@/core/prisma/prisma";
import { convertToPlainObject } from "@/lib/utils";
import { AnimalStatus } from "@prisma/client";

/* await getAnimalsByContributorWithFilters({
  contributorId: "uuid-contributor",
  status: "ADOPTABLE", // 👈 only adoptable animals
  page: 1,
  pageSize: 10
}); */
export async function getAnimalsByContributorWithFilters({
  contributorId,
  animalType, // e.g., "dogs", "cats", "rodents"
  search,
  page = 1,
  pageSize = 10,
  status, // 👈 new filter
}: {
  contributorId: string;
  animalType?: string;
  search?: string;
  page?: number;
  pageSize?: number;
  status?: AnimalStatus; // 👈 accepts a value of the enum type
}) {
  const skip = (page - 1) * pageSize;

  const contributor = await prisma.contributor.findUnique({
    where: { id: contributorId },
    select: {
      animalTypes: true,
    },
  });

  if (!contributor) {
    throw new Error("Contributor not found");
  }

  if (animalType && !contributor.animalTypes.includes(animalType)) {
    throw new Error(
      `The contributor does not manage animals of type: ${animalType}`
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filters: any = {
    contributorId,
  };

  if (search) {
    filters.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { breed: { contains: search, mode: "insensitive" } },
      { microchipCode: { contains: search, mode: "insensitive" } },
    ];
  }

  if (status) {
    filters.status = status;
  }

  const [animals, total] = await Promise.all([
    prisma.animal.findMany({
      where: {
        ...filters,
        ...(animalType ? { animalType } : {}), // Include animalType filter only if it exists
      },
      skip,
      take: pageSize,
      orderBy: {
        intakeDate: "desc",
      },
    }),
    prisma.animal.count({
      where: {
        ...filters,
        ...(animalType ? { animalType } : {}), // Include animalType filter only if it exists
      },
    }),
  ]);

  return {
    data: convertToPlainObject(animals),
    pagination: {
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    },
    allowedAnimalTypes: contributor.animalTypes,
  };
}
