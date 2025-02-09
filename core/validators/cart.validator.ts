import { currency } from "@/lib/utils";
import { z } from "zod";

export const cartItemSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  qty: z.number().int().nonnegative("Quantity must be a positive number"),
  image: z.string().min(1, "Image is required"),
  price: currency,
}); // Add schema for cart item

export const insertCartSchema = z.object({
  items: z.array(cartItemSchema),
  itemsPrice: currency,
  totalPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  sessionCartId: z.string().min(1, "Session cart id is required"),
  userId: z.string().optional().nullable(),
}); // Add schema for inserting cart

export const updateCartSchema = insertCartSchema.extend({
  id: z.string().min(1, "Cart id is required"),
}); // Add schema for updating cart

export type ICartItem = z.infer<typeof cartItemSchema>;
export type ICart = z.infer<typeof insertCartSchema>;
export type ICartUpdate = z.infer<typeof updateCartSchema>;
