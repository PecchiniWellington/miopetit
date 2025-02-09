import { z } from "zod";

export const LatestSalesSchema = z.object({
  user: z
    .object({
      name: z.string(),
    })
    .nullable(),
  id: z.string(),
  createdAt: z.date(),
  totalPrice: z.string(),
});

export const SalesDataTypeSchema = z.array(
  z.object({
    month: z.string(),
    totalSales: z.number(),
  })
);

export type ILatestSales = z.infer<typeof LatestSalesSchema>;
export type ISalesDataType = z.infer<typeof SalesDataTypeSchema>;
