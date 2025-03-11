import { z } from "zod";

import { currency } from "@/lib/utils";
import { orderSchema } from "./orders.validator";

export const orderItemSchema: z.ZodSchema = z.object({
  orderId: z.string().uuid(),
  productId: z.string().uuid(),
  qty: z.number(),
  price: currency,
  name: z.string().nullable(),
  slug: z.string(),
  image: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  order: z.lazy(() => orderSchema).optional(),
  product: z
    .object({
      id: z.string().uuid(),
    })
    .optional(),
});

export type IOrderItem = z.infer<typeof orderItemSchema>;
