import { z } from "zod";

export const unitValueSchema = z.object({
  id: z.string().uuid().optional(),
  value: z.number().min(0).max(99999999.99).nullable(),
});

export const unitOfMeasureSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1).max(255),
  code: z.string().min(1).max(10),
});

export const productUnitFormatSchema = z.object({
  id: z.string().uuid().optional(),
  unitValue: unitValueSchema,
  unitOfMeasure: unitOfMeasureSchema,
  unitValueId: z.string().uuid(),
  unitMeasureId: z.string().uuid(),
  slug: z.string(),
});

export type IUnitValue = z.infer<typeof unitValueSchema>;
export type IUnitOfMeasure = z.infer<typeof unitOfMeasureSchema>;
export type IProductUnitFormat = z.infer<typeof productUnitFormatSchema>;
