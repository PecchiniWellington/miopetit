import { currency } from "@/lib/utils";
import { z } from "zod";

// Schema for Product model
export const productSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3, "Name must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  images: z.array(z.string().min(1, "Product must have at least 1 image")),
  brand: z.string().min(3, "Brand must be at least 3 characters"),
  description: z.string().min(3, "Description must be at least 3 characters"),
  stock: z.number(),
  price: currency,
  rating: z.string(),
  banner: z.string().nullable(),
  categoryId: z.string().uuid().nullable(),
  numReviews: z.number().default(0),
  isFeatured: z.boolean().optional().default(false),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
  productBrandId: z.string().uuid().nullable(),
  formatId: z.string().uuid().nullable(),
  animalAgeId: z.string().uuid().nullable(),
  productFeaturesId: z.string().uuid().nullable(),
  productProteinId: z.string().uuid().nullable(),
  productPatologyId: z.string().uuid().nullable(),
});

// Schema for inserting products
export const insertProductSchema = z.object({
  name: z.string().min(3, "Name must be a at least 3 characters"),
  slug: z.string().min(3, "Slug must be a at least 3 characters"),
  images: z.array(z.string().min(1, "Product must have at least 1 image")),
  brand: z.string().min(3, "Brand must be a at least 3 characters"),
  description: z.string().min(3, "Description must be a at least 3 characters"),
  stock: z.coerce.number(),
  price: currency,
  banner: z.string().nullable(),
  categoryId: z
    .string()
    .min(3, "Category must be a at least 3 characters")
    .nullable(),
  isFeatured: z.boolean(),
});

export const updateProductSchema = insertProductSchema.extend({
  id: z.string().min(1, "Id is required"),
});

export type IProduct = z.infer<typeof productSchema>;
export type IInsertProduct = z.infer<typeof insertProductSchema>;
export type IUpdateProduct = z.infer<typeof updateProductSchema>;
