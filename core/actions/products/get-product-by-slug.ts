import { prisma } from "@/core/prisma/prisma";
import { convertToPlainObject } from "@/lib/utils";
export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findFirst({
    where: {
      slug,
    },
  });
  /* prisma.$disconnect(); */
  return convertToPlainObject(product);
}
