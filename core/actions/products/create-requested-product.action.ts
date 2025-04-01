"use server";

import { prisma } from "@/core/prisma/prisma";
import { cartItemSchema } from "@/core/validators";
import { z } from "zod";
import { clearCart } from "../cart/cart.actions";

// Array schema per validare più elementi
const cartItemArraySchema = z.array(cartItemSchema);

type ICartItem = z.infer<typeof cartItemSchema>;

export async function createRequestedProducts({
  contributorId,
  products,
}: {
  contributorId: string;
  products: ICartItem[];
}) {
  if (!contributorId) {
    throw new Error("contributorId is required");
  }

  const parsed = cartItemArraySchema.safeParse(products);

  if (!parsed.success) {
    console.error(
      "❌ Errore nella validazione degli items:",
      parsed.error.format()
    );
    throw new Error("Errore nella validazione dei prodotti da wishlist");
  }

  // Estrai tutti gli ID unici dei prodotti da caricare dal DB
  const productIds = parsed.data.map((item) => item.productId);

  const baseProducts = await prisma.product.findMany({
    where: {
      id: { in: productIds },
    },
    select: {
      id: true,
      name: true,
    },
  });

  // Mappatura baseProductId => prodotto
  const productMap = new Map(baseProducts.map((p) => [p.id, p]));

  // Costruzione dei requestedProduct
  const dataToInsert = parsed.data.map((item) => {
    const baseProduct = productMap.get(item.productId);

    if (!baseProduct) {
      throw new Error(`Prodotto con ID ${item.productId} non trovato`);
    }

    const quantity = item.qty;
    const price = Number(item.price);
    const targetAmount = price * quantity;

    return {
      name: baseProduct.name,
      image: item.image ?? null,
      price,
      quantity,
      targetAmount,
      fundedAmount: 0,
      notes: "Aggiunto alla wishlist dal rifugio",
      status: "PENDING" as const,
      contributorId,
      baseProductId: baseProduct.id,
    };
  });
  const created = await prisma.requestedProduct.createMany({
    data: dataToInsert,
  });

  if (created.count > 0) {
    await clearCart();
  }

  return created;
}
