// file: core/actions/requested-product.actions.ts

"use server";

import { prisma } from "@/core/prisma/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const updateRequestedProductSchema = z.object({
  id: z.string().uuid(),
  quantity: z.number().int().min(1),
  notes: z.string().optional(),
});

export async function updateRequestedProduct(input: {
  id: string;
  quantity: number;
  notes?: string;
}) {
  const parsed = updateRequestedProductSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Invalid input for updating requested product");
  }

  const { id, quantity, notes } = parsed.data;

  // Recupera il prodotto per ricavare il prezzo unitario
  const existingProduct = await prisma.requestedProduct.findUnique({
    where: { id },
  });

  if (!existingProduct) {
    throw new Error("Requested product not found");
  }

  const updated = await prisma.requestedProduct.update({
    where: { id },
    data: {
      quantity,
      notes,
      targetAmount: quantity * existingProduct.price, // aggiorna anche il totale
    },
  });

  revalidatePath(`/admin/products/${id}/edit/requested-product`);
  return updated;
}
