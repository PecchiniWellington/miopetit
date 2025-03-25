import { prisma } from "@/core/prisma/prisma";
import { convertToPlainObject } from "@/lib/utils";

export async function getAllContributors() {
  const data = await prisma.contributor.findMany();
  return convertToPlainObject(data);
}
