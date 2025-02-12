import { currency } from "@/lib/utils";
import { z } from "zod";
import { orderItemSchema } from "./orders.validator";
import { productUnitFormatSchema } from "./unitsFormat.validator";

// Schema for Product model

export const productSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3, "Name must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  images: z.array(z.string().min(1, "Product must have at least 1 image")),
  description: z.string().min(3, "Description must be at least 3 characters"),
  stock: z.number().nullable().default(0),
  price: z.string(),
  rating: z.number().nullable().optional(),
  banner: z.string().nullable(),
  categoryId: z.string().uuid().nullable(),
  numReviews: z.number().default(0),
  isFeatured: z.boolean().nullable().optional().default(false),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
  productBrandId: z.string().uuid().nullable(),
  productPathologyId: z.string().uuid().nullable(),
  productProteinsId: z.array(z.string().uuid()).nullable().optional(),
  orderitems: z.array(orderItemSchema),
  animalAge: z.enum(["PUPPY", "ADULT", "SENIOR"]).nullable(),
  unitValueId: z.string().uuid().optional(),
  unitOfMeasureId: z.string().uuid().optional(),
  productUnitFormat: productUnitFormatSchema.optional(),
});

// Schema for inserting products
export const insertProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  images: z.array(z.string().min(1, "Product must have at least 1 image")),
  description: z.string().min(3, "Description must be at least 3 characters"),
  stock: z.coerce.number().nullable().default(0),
  price: currency,
  banner: z.string().nullable(),
  isFeatured: z.boolean().optional().default(false),
  rating: z.number().nullable().optional(),
  animalAge: z.enum(["PUPPY", "ADULT", "SENIOR"]).nullable(),
  productBrandId: z.string().uuid().nullable().optional(),
  productPathologyId: z.string().uuid().nullable().optional(),
  productProteinOnProduct: z.array(z.string().uuid()).nullable().optional(),
  categoryId: z.string().uuid().nullable(),
  unitValueId: z.string().uuid().nullable().optional(),
  unitOfMeasureId: z.string().uuid().nullable().optional(),
  productFeatureOnProduct: z.array(z.string().uuid()).nullable(),
});

export const updateProductSchema = insertProductSchema.extend({
  id: z.string().min(1, "Id is required"),
});

export const latestProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.string(),
  rating: z.number(),
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
  productProteinOnProduct: {
    productId: string;
    productProteinId: string;
    productProtein: { id: string; name: string };
  }[];
  productsFeatureOnProduct: {
    productId: string;
    productFeatureId: string;
    productFeature: {
      id: string;
      name: string;
      description: string | null;
    };
  }[];
};
export type IInsertProduct = z.infer<typeof insertProductSchema>;
export type IUpdateProduct = z.infer<typeof updateProductSchema>;
export type ILatestProduct = z.infer<typeof latestProductSchema>;
