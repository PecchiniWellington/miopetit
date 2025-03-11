import { z } from "zod";

import { orderItemSchema } from "./order-items.validator";
import { shippingAddressSchema } from "./shipping.validator";

/* export const orderSchema: z.ZodSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  isPaid: z.boolean(),
  paidAt: z.date().nullable(),
  isDelivered: z.boolean(),
  deliveredAt: z.date().nullable(),
  orderitems: z.array(z.lazy(() => orderItemSchema)),
  paymentResult: z.object({
    id: z.string(),
    status: z.string(),
    pricePaid: z.string(),
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
}); */

export const orderSchema: z.ZodSchema = z.object({
  id: z.string().optional(),
  userId: z.string(),
  shippingAddress: z.lazy(() => shippingAddressSchema),
  paymentMethod: z.string(),
  paymentResult: z
    .object({
      id: z.string(),
      status: z.string(),
      pricePaid: z.string(),
      email_address: z.string(),
    })
    .optional(),
  itemsPrice: z.string(),
  shippingPrice: z.string(),
  taxPrice: z.string(),
  totalPrice: z.string(),
  isPaid: z.boolean().default(false),
  isDelivered: z.boolean().default(false),
  paidAt: z.date().nullable().optional(),
  deliveredAt: z.date().nullable().optional(),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
  orderitems: z.array(z.lazy(() => orderItemSchema)).optional(),
});

export type IOrder = z.infer<typeof orderSchema>;
