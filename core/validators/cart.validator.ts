import { currency } from "@/lib/utils";
import { z } from "zod";

export const cartItemSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  name: z.string().min(1, "Name is required"),
  slug: z.string().optional(),
  qty: z.number().int().nonnegative("Quantity must be a positive number"),
  image: z.string().optional(),
  price: currency,
});

export const cartSchema = z.object({
  id: z.string().uuid(),
  items: z.array(cartItemSchema),
  createdAt: z.date().optional(),
  itemsPrice: currency,
  totalPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  sessionCartId: z.string().uuid(),
  userId: z.string().uuid(),
});

export type ICartItem = z.infer<typeof cartItemSchema>;
export type ICart = z.infer<typeof cartSchema>;
