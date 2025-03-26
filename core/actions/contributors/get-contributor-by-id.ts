// core/actions/contributors/get-contributor-by-id.ts
"use server";
import { prisma } from "@/core/prisma/prisma";

export async function getContributorById(id: string) {
  return await prisma.contributor.findUnique({
    where: { id },
    include: {
      user: { select: { email: true, name: true } },
    },
  });
}
