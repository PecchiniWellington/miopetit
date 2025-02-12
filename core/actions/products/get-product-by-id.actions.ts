import { prisma } from "@/core/prisma/prisma";
import { convertToPlainObject } from "@/lib/utils";

// Get product by id with sales data
export async function getProductById(id: string) {
  const product = await prisma.product.findFirst({
    where: { id },
    include: {
      orderitems: true,
      category: true,
      productBrand: true,
      /*  productPathology: true, */
      productUnitFormat: {
        include: {
          unitValue: true,
          unitOfMeasure: true,
        },
      },
      productProteinOnProduct: {
        include: {
          productProtein: true,
        },
      },
    },
  });

  if (!product) return null;

  const totalSales = product.orderitems.reduce(
    (acc, item) => acc + item.qty,
    0
  );
  const totalRevenue = product.orderitems.reduce(
    (acc, item) => acc + item.qty * Number(item.price),
    0
  );

  return convertToPlainObject({
    ...product,
    category: product.category ? product.category.name : null,
    totalSales,
    totalRevenue,
  });
}
