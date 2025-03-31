// core/actions/contributors/get-contributor-by-id.ts
"use server";
import { prisma } from "@/core/prisma/prisma";

export async function getContributorById(id: string) {
  return await prisma.contributor.findUnique({
    where: { id },
    include: {
      users: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });
}
