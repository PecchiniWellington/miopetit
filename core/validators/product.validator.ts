import { currency } from "@/lib/utils";
import { z } from "zod";
import { categorySchema } from "./category.validator";
import { orderSchema } from "./orders.validator";

// Schema for Product model
export const productSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3, "Name must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  images: z.array(z.string().min(1, "Product must have at least 1 image")),
  description: z.string().min(3, "Description must be at least 3 characters"),
  stock: z.number(),
  price: currency,
  rating: z.string().nullable(),
  banner: z.string().nullable(),
  categoryId: z.string().uuid().nullable(),
  numReviews: z.number().default(0),
  isFeatured: z.boolean().optional().default(false),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
  productBrandId: z.string().uuid().nullable(),
  formatId: z.string().uuid().nullable(),
  productFeaturesId: z.string().uuid().nullable(),
  productProteinId: z.string().uuid().nullable(),
  productPatologyId: z.string().uuid().nullable(),
  category: categorySchema,
  orderitems: z.array(orderSchema),
});

// Schema for inserting products
export const insertProductSchema = z.object({
  name: z.string().min(3, "Name must be a at least 3 characters"),
  slug: z.string().min(3, "Slug must be a at least 3 characters"),
  images: z.array(z.string().min(1, "Product must have at least 1 image")),
  description: z.string().min(3, "Description must be a at least 3 characters"),
  stock: z.coerce.number(),
  price: currency,
  banner: z.string().nullable(),
  categoryId: z
    .string()
    .min(3, "Category must be a at least 3 characters")
    .nullable(),
  isFeatured: z.boolean().optional().default(false),
});

export const updateProductSchema = insertProductSchema.extend({
  id: z.string().min(1, "Id is required"),
});

export const latestProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.string(),
  rating: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  brand: z.string(),
  numReviews: z.number(),
  slug: z.string(),
  banner: z.string().nullable(),

  // Add other fields as necessary
});

export type IProduct = z.infer<typeof productSchema>;
export type IInsertProduct = z.infer<typeof insertProductSchema>;
export type IUpdateProduct = z.infer<typeof updateProductSchema>;
export type ILatestProduct = z.infer<typeof latestProductSchema>;
