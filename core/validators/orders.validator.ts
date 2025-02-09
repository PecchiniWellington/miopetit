import { z } from "zod";

import { PAYMENT_METHODS } from "@/lib/constants/payment-methods";
import { currency } from "@/lib/utils";
import { shippingAddressSchema } from "./shipping.validator";

// Schema for insert the order
export const insertOrderSchema = z.object({
  userId: z.string().min(1, "User id is required"),
  itemsPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  totalPrice: currency,
  paymentMethod: z.string().refine((data) => PAYMENT_METHODS?.includes(data), {
    message: "Invalid payment method",
  }),
  shippingAddress: shippingAddressSchema,
});

export const insertOrderItemSchema = z.object({
  productId: z.string(),
  slug: z.string(),
  image: z.string(),
  name: z.string(),
  price: currency,
  qty: z.number(),
});

export const orderSchema = insertOrderSchema.extend({
  id: z.string(),
  createdAt: z.date(),
  isPaid: z.boolean(),
  paidAt: z.date().nullable(),
  isDelivered: z.boolean(),
  deliveredAt: z.date().nullable(),
  orderitems: z.array(insertOrderItemSchema),
  paymentResult: z.object({
    id: z.string(),
    status: z.string(),
    update_time: z.string(),
    email_address: z.string(),
  }),
  user: z
    .object({
      name: z.string(),
      email: z.string(),
    })
    .nullable(),
  latestSales: z
    .array(
      z.object({
        saleId: z.string(),
        amount: currency,
        date: z.date(),
      })
    )
    .optional(),
});

export type IOrderItem = z.infer<typeof insertOrderItemSchema>;
export type IOrder = z.infer<typeof orderSchema>;
export type IOrderInsert = z.infer<typeof insertOrderSchema>;
