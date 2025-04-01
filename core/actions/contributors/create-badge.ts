import { prisma } from "@/core/prisma/prisma";

export async function createBadge(contributorId: string) {
  const totalRequested = await prisma.requestedProduct.count({
    where: {
      contributorId,
    },
  });

  const totalFunded = await prisma.requestedProduct.count({
    where: {
      contributorId,
      status: "FUNDED",
    },
  });

  if (totalRequested > 0 && totalFunded === totalRequested) {
    await prisma.contributor.update({
      where: { id: contributorId },
      data: { hasFundedBadge: true },
    });
  }
}
