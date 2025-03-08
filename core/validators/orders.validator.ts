import { z } from "zod";

import { currency } from "@/lib/utils";
import { orderItemSchema } from "./order-items.validator";

export const orderSchema: z.ZodSchema = z.object({
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
});

export type IOrder = z.infer<typeof orderSchema>;
