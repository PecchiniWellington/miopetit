import { prisma } from "@/core/prisma/prisma";
import { convertToPlainObject } from "@/lib/utils";

export async function getProductBrandByProductId(productId: string) {
  const product = await prisma.productBrand.findFirst({
    where: {
      id: productId,
    },
  });
  return convertToPlainObject(product);
}
