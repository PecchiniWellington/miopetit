import { prisma } from "@/core/prisma/prisma";
import { AnimalStatus } from "@prisma/client";

/* await getAnimalsByContributorWithFilters({
  contributorId: "uuid-contributor",
  status: "ADOPTABLE", // 👈 solo animali adottabili
  page: 1,
  pageSize: 10
}); */
export async function getAnimalsByContributorWithFilters({
  contributorId,
  animalType, // es: "cani", "gatti", "roditori"
  search,
  page = 1,
  pageSize = 10,
  status, // 👈 nuovo filtro
}: {
  contributorId: string;
  animalType?: string;
  search?: string;
  page?: number;
  pageSize?: number;
  status?: AnimalStatus; // 👈 accetta un valore del tipo enum
}) {
  const skip = (page - 1) * pageSize;

  const contributor = await prisma.contributor.findUnique({
    where: { id: contributorId },
    select: {
      animalTypes: true,
    },
  });

  if (!contributor) {
    throw new Error("Contributor non trovato");
  }

  if (animalType && !contributor.animalTypes.includes(animalType)) {
    throw new Error(
      `Il contributor non gestisce animali di tipo: ${animalType}`
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
      where: filters,
      skip,
      take: pageSize,
      orderBy: {
        intakeDate: "desc",
      },
    }),
    prisma.animal.count({
      where: filters,
    }),
  ]);

  return {
    animals,
    pagination: {
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    },
    allowedAnimalTypes: contributor.animalTypes,
  };
}
