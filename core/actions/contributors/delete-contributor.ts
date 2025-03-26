"use server";
import { prisma } from "@/core/prisma/prisma";

export async function deleteContributor(id: string) {
  await prisma.contributor.delete({ where: { id } });
  return { success: true };
}
