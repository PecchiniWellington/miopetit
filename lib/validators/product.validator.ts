import { z } from "zod";
import { currency } from "../utils";

// Schema for inserting products
export const insertProductSchema = z.object({
  name: z.string().min(3, "Name must be a at least 3 characters"),
  slug: z.string().min(3, "Slug must be a at least 3 characters"),
  categoryId: z
    .string()
    .min(3, "Category must be a at least 3 characters")
    .nullable(),
  brand: z.string().min(3, "Brand must be a at least 3 characters"),
  description: z.string().min(3, "Description must be a at least 3 characters"),
  stock: z.coerce.number(),
  images: z.array(z.string().min(1, "Product must have at least 1 image")),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: currency,
});

export const updateProductSchema = insertProductSchema.extend({
  id: z.string().min(1, "Id is required"),
});
