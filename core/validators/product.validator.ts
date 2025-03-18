import { IBrand } from "@/types/index";
import { z } from "zod";

export const productSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
  stock: z.number().int().nonnegative(),
  rating: z.number().min(0).max(5).default(0),
  banner: z.string().optional().nullable(),
  numReviews: z.number().int().nonnegative(),
  isFeatured: z.boolean(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
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

export const createProductSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
  stock: z.number().int().nonnegative(),
  banner: z.string().optional().nullable(),
  isFeatured: z.boolean(),
  createdAt: z.string().optional(),
  animalAge: z.enum(["PUPPY", "ADULT", "SENIOR"]),
  categoryType: z.string(),
  percentageDiscount: z.number().int().nonnegative().max(100),
  images: z.array(z.string()),
  description: z.string(),
  productBrandId: z.string(),
  unitValueId: z.string(),
  unitOfMeasureId: z.string(),
  productPathologyId: z.string(),
  productProteinsId: z.array(z.string()),
  productFeaturesId: z.array(z.string()),
});

export type IFormattedProduct = IProduct & {
  totalSales: number;
  totalRevenue: number;
  productBrand?: IBrand | null;
};

export type IProduct = z.infer<typeof productSchema>;
export type ICreateProduct = z.infer<typeof createProductSchema>;
