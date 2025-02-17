import { z } from "zod";

export const unitValueSchema = z.object({
  id: z.string().uuid(),
  value: z.number().min(0).max(99999999.99).nullable(), // Simulazione di Decimal(10,2)
});

export const unitOfMeasureSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(255),
  code: z.string().min(1).max(10),
});

export const productUnitFormatSchema = z.object({
  id: z.string().uuid(),
  unitValue: unitValueSchema,
  unitOfMeasure: unitOfMeasureSchema,
  unitValueId: z.string().uuid(),
  unitMeasureId: z.string().uuid(),
  slug: z.string(),
});

export type IUnitValue = z.infer<typeof unitValueSchema>;
export type IUnitOfMeasure = z.infer<typeof unitOfMeasureSchema>;
export type IProductUnitFormat = z.infer<typeof productUnitFormatSchema>;
