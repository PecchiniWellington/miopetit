import {
  insertProductSchema,
  insertCartSchema,
  cartItemSchema,
  shippingAddressSchema,
  paymentMethodSchema,
} from "@/lib/validator";
import { z } from "zod";

export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  rating: string;
  createdAt: Date;
};

export type Cart = z.infer<typeof insertCartSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
export type IShippingAddress = z.infer<typeof shippingAddressSchema>;

// Payment method type
export type IPaymentMethod = z.infer<typeof paymentMethodSchema>;
