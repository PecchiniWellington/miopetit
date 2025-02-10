import { prisma } from "@/core/prisma/prisma";
import { convertToPlainObject } from "@/lib/utils";

// Get product by id with sales data
export async function getProductById(id: string) {
  const product = await prisma.product.findFirst({
    where: { id },
    include: {
      orderitems: true, // Include tutti gli ordini di questo prodotto
      category: true, // ✅ Include la categoria se categoryId esiste
      productBrand: true, // ✅ Include il brand se productBrandId esiste
      productPatology: true, // ✅ Include la patologia se productPatologyId esiste
      productProtein: true, // ✅ Include le proteine se productProteinId esiste
    },
  });

  if (!product) return null;

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
  });
}
