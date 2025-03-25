import { prisma } from "@/core/prisma/prisma";

export async function getContributorById(id: string) {
  const contributor = await prisma.contributor.findUnique({
    where: { id },
  });
  return contributor;
}
