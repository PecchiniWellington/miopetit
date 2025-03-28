// core/actions/contributors/get-contributor-by-id.ts
"use server";
import { prisma } from "@/core/prisma/prisma";
import { convertToPlainObject } from "@/lib/utils";

export async function getContributorBySlug(slug: string) {
  const user = await prisma.contributor.findUnique({
    where: { slug },
    include: {
      users: { select: { email: true, name: true } },
    },
  });

  return convertToPlainObject(user);
}
