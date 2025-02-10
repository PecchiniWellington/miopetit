import { prisma } from "@/core/prisma/prisma";
import { convertToPlainObject } from "@/lib/utils";
import { getAllBrands } from "./product-infos.ts";

// Get product by id with sales data
export async function getProductById(id: string) {
  const product = await prisma.product.findFirst({
    where: { id },
    include: {
      orderitems: true, // Include tutti gli ordini di questo prodotto
    },
  });

  if (!product) return null;
  const brands = await getAllBrands();

  // Calcola il totale delle unità vendute e il guadagno totale
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
    totalSales,
    totalRevenue,
    productBrand: brands?.find((brand) => brand.id === product.productBrandId),
  });
}
