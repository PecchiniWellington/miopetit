import { z } from "zod";
import { productSchema } from "./product.validator";

export const productFeaturesSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().optional(),
});

export const productFeatureOnProductSchema = z.object({
  productId: z.string().uuid(),
  productFeatureId: z.string().uuid(),
  product: productSchema,
  productFeature: productFeaturesSchema,
});

export type IProductFeatureOnProduct = z.infer<
  typeof productFeatureOnProductSchema
>;
export type IProductFeature = z.infer<typeof productFeaturesSchema>;
