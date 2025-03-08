import { IBrand } from "@/types/index";
import { z } from "zod";

export const productSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
  stock: z.number().int().nonnegative(),
  rating: z.number().min(0).max(5).default(0),
  numReviews: z.number().int().nonnegative(),
  isFeatured: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  animalAge: z.enum(["PUPPY", "ADULT", "SENIOR"]),
  categoryType: z.string(),
  percentageDiscount: z.number().int().nonnegative().max(100),
  images: z.array(z.string()),
  description: z.string(),

  productBrand: z
    .object({
      id: z.string().uuid(),
      name: z.string(),
    })
    .nullable(), // Può essere null

  productUnitFormat: z
    .object({
      id: z.string().uuid(),
      unitValue: z.number(),
      unitOfMeasure: z.string(),
      slug: z.string(),
    })
    .nullable(),

  productPathologies: z.array(
    z.object({
      id: z.string().uuid(),
      name: z.string(),
    })
  ),

  productProteins: z.array(
    z.object({
      id: z.string().uuid(),
      name: z.string(),
    })
  ),

  productCategories: z.array(
    z.object({
      id: z.string().uuid(),
      name: z.string(),
      slug: z.string(),
      parentId: z.string().uuid().nullable().optional(),
    })
  ),

  productFeature: z.array(
    z.object({
      id: z.string().uuid(),
      name: z.string(),
    })
  ),
});

// Schema per l'inserimento di prodotti
export const insertProductSchema = productSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Schema per l'aggiornamento dei prodotti
export const updateProductSchema = insertProductSchema.extend({
  id: z.string().uuid().min(1, "L'ID è obbligatorio"),
});

// Definizione dei tipi

export type IFormattedProduct = IProduct & {
  totalSales: number;
  totalRevenue: number;
  productBrand?: IBrand | null;
};

export type IProduct = z.infer<typeof productSchema>;
export type IInsertProduct = z.infer<typeof insertProductSchema>;
export type IUpdateProduct = z.infer<typeof updateProductSchema>;
