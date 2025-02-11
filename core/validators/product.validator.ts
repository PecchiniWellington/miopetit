import { currency } from "@/lib/utils";
import { z } from "zod";
import { orderItemSchema } from "./orders.validator";
import { productUnitFormatSchema } from "./units.validator";

// Schema for Product model

export const productSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3, "Name must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  images: z.array(z.string().min(1, "Product must have at least 1 image")),
  description: z.string().min(3, "Description must be at least 3 characters"),
  stock: z.number().nullable().default(0),
  price: z.number().positive("Price must be a positive number"), // 🛠 Assicura che il prezzo sia positivo
  rating: z.number().nullable(),
  banner: z.string().nullable(),
  categoryId: z.string().uuid().nullable(),
  numReviews: z.number().default(0),
  isFeatured: z.boolean().optional().default(false),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
  productBrandId: z.string().uuid().nullable(),
  formatId: z.string().uuid().nullable(),
  productFeaturesId: z.string().uuid().nullable(),
  productPatologyId: z.string().uuid().nullable(),
  orderitems: z.array(orderItemSchema),

  unitValueId: z.string().uuid().optional(), // 🛠 ID del valore unitario
  unitOfMeasureId: z.string().uuid().optional(), // 🛠 ID dell'unità di misura
  productUnitFormat: productUnitFormatSchema,
});

// Schema for inserting products
export const insertProductSchema = z.object({
  name: z.string().min(3, "Name must be a at least 3 characters"),
  slug: z.string().min(3, "Slug must be a at least 3 characters"),
  images: z.array(z.string().min(1, "Product must have at least 1 image")),
  description: z.string().min(3, "Description must be a at least 3 characters"),
  stock: z.coerce.number().nullable().default(0),
  price: currency,
  productBrandId: z.string().uuid().nullable(),
  productPatologyId: z.string().uuid().nullable(),
  banner: z.string().nullable(),
  productProteins: z.array(z.string().uuid()).nullable(),
  categoryId: z
    .string()
    .min(3, "Category must be a at least 3 characters")
    .nullable(),
  isFeatured: z.boolean().optional().default(false),
  productUnitFormatId: z.string().uuid().optional(), // Se esiste già, lo colleghiamo
  unitValueId: z.string().uuid().optional().nullable(),
  unitOfMeasureId: z.string().uuid().optional().nullable(),
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
  productBrandId: z.string().uuid().nullable(),
  updatedAt: z.date(),
  numReviews: z.number(),
  slug: z.string(),
  banner: z.string().nullable(),
  isFeatured: z.boolean().optional().default(false),
  unitValueId: z.string().uuid().optional().nullable(),
  unitOfMeasureId: z.string().uuid().optional().nullable(),

  // Add other fields as necessary
});

export type IProduct = z.infer<typeof productSchema> & {
  productBrand?: { name: string; id: string };
  category?: string;
  productProteins?: Array<{
    productId: string;
    productProteinId: string;
    productProtein: {
      id: string;
      name: string;
    };
  }>;
};
export type IInsertProduct = z.infer<typeof insertProductSchema>;
export type IUpdateProduct = z.infer<typeof updateProductSchema>;
export type ILatestProduct = z.infer<typeof latestProductSchema>;
