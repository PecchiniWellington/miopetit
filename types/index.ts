import {
  insertProductSchema,
  insertCartSchema,
  cartItemSchema,
  shippingAddressSchema,
  paymentMethodSchema,
  insertOrderSchema,
  insertOrderItemSchema,
  paymentResultSchema,
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

// Orders
export type IOrderItem = z.infer<typeof insertOrderItemSchema>;
export type IOrder = z.infer<typeof insertOrderSchema> & {
  id: string;
  createdAt: Date;
  isPaid: Boolean;
  paidAt: Date | null;
  isDelivered: Boolean;
  deliveredAt: Date | null;
  orderitems: IOrderItem[];
  user: { name: string; email: string } | null;
};

// Payment result
export type IPaymentResult = z.infer<typeof paymentResultSchema>;
