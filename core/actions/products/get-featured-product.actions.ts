import { prisma } from "@/core/prisma/prisma";
import { convertToPlainObject } from "@/lib/utils";

export async function getFeaturedProducts() {
  const products = await prisma.product.findMany({
    where: {
      isFeatured: true,
    },
    orderBy: { createdAt: "desc" },
    take: 4,
  });

  return convertToPlainObject(products);
}
