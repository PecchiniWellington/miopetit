import { z } from "zod";

export const productFeaturesSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
});

export const productFeatureOnProductSchema = z.object({
  productId: z.string().uuid(),
  productFeatureId: z.string().uuid(),
  productFeature: productFeaturesSchema,
});

export type IProductFeatureOnProduct = z.infer<
  typeof productFeatureOnProductSchema
>;
export type IProductFeature = z.infer<typeof productFeaturesSchema>;
