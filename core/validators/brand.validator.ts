import { z } from "zod";
import { productSchema } from "./product.validator";

export const ProductBrandValidator = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  image: z.string().url().optional(),
  products: z.array(productSchema).optional(), // Adjust this based on your Product schema
});

// Example usage
export type IProductBrand = z.infer<typeof ProductBrandValidator>;
