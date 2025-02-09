import { prisma } from "@/core/prisma/prisma";
import { latestProductSchema } from "@/core/validators/product.validator";
import { LATEST_PRODUCTS_LIMIT } from "@/lib/constants";
import { convertToPlainObject } from "@/lib/utils";

export async function getLatestProducts({
  limit = LATEST_PRODUCTS_LIMIT,
}: {
  limit?: number;
}) {
  const products = await prisma.product.findMany({
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  });

  const productsData = products.map((product) => {
    const parsedProduct = latestProductSchema.parse({
      ...product,
      price: product.price.toString(),
      rating: product.rating.toString(),
    });
    return parsedProduct;
  });
  /* prisma.$disconnect(); */
  return convertToPlainObject(productsData);
}
