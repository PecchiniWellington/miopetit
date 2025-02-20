import { currency } from "@/lib/utils";
import { z } from "zod";

export const cartItemSchema = z.object({
  id: z.string().min(1, "Product is required"),
  name: z.string().min(1, "Name is required"),
  slug: z.string().optional(),
  qty: z.number().int().nonnegative("Quantity must be a positive number"),
  image: z.string().optional(),
  price: currency,
});

export const insertCartSchema = z.object({
  items: z.array(cartItemSchema),
  itemsPrice: currency,
  totalPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  sessionCartId: z.string().min(1, "Session cart id is required"),
  userId: z.string().optional().nullable(),
});
export type ICartItem = z.infer<typeof cartItemSchema>;
export type ICart = z.infer<typeof insertCartSchema>;
