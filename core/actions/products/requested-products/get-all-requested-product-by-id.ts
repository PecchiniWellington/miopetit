import { prisma } from "@/core/prisma/prisma";
import { convertToPlainObject } from "@/lib/utils";

export async function getAllRequestedProductById(id: string | undefined) {
  const requested = await prisma.requestedProduct.findUnique({
    where: { id: id },
    include: { contributor: true },
  });

  return convertToPlainObject(requested);
}
