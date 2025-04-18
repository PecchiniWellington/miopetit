import { IBrand } from "@/types/index";
import { z } from "zod";

export const productSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  slug: z.string(),
  price: z.preprocess((val) => Number(val), z.number()),
  costPrice: z.preprocess((val) => Number(val), z.number()),
  stock: z.preprocess(
    (val) => (val === null ? null : Number(val)),
    z.number().nullable().optional()
  ),
  rating: z.number().min(0).max(5).default(0),
  banner: z.string().optional().nullable(),
  numReviews: z.number().int().nonnegative().optional(),
  isFeatured: z.boolean(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  animalAge: z.enum(["PUPPY", "ADULT", "SENIOR"]),
  categoryType: z.string().optional(),
  percentageDiscount: z.number().int().nonnegative().max(100).optional(),
  images: z.array(z.string()),
  description: z.string(),
  shortDescription: z.string(),
  contributorId: z.string().uuid().optional().nullable(),

  productBrand: z
    .object({
      id: z.string().uuid(),
      name: z.string(),
    })
    .nullable(),

  productUnitFormat: z
    .object({
      id: z.string().uuid().optional(),
      unitValue: z.object({
        id: z.string().uuid(),
        value: z.number(),
      }),
      unitOfMeasure: z.object({
        id: z.string().uuid(),
        code: z.string(),
        name: z.string(),
      }),
      slug: z.string().optional(),
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

  productCategory: z.array(
    z.object({
      id: z.string().uuid(),
      name: z.string(),
      slug: z.string().optional(),
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
  id: z.string().uuid().optional(),
  name: z.string(),
  slug: z.string(),
  price: z.preprocess((val) => Number(val), z.number()),
  costPrice: z.preprocess((val) => Number(val), z.number()),
  stock: z.preprocess(
    (val) => (val === null ? null : Number(val)),
    z.number().nullable().optional()
  ),
  rating: z.number().min(0).max(5).default(0),
  banner: z.string().optional().nullable(),
  numReviews: z.number().int().nonnegative().optional(),
  isFeatured: z.boolean(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  animalAge: z.enum(["PUPPY", "ADULT", "SENIOR"]),
  categoryType: z.string().optional(),
  percentageDiscount: z.number().int().nonnegative().max(100).optional(),
  images: z.array(z.string()),
  description: z.string(),
  shortDescription: z.string(),

  productBrand: z
    .object({
      id: z.string().uuid(),
      name: z.string(),
    })
    .nullable(),

  productUnitFormat: z
    .object({
      id: z.string().uuid().optional(),
      slug: z.string().optional(),
      unitValue: z.object({
        id: z.string().uuid(),
        value: z.number(),
      }),
      unitOfMeasure: z.object({
        id: z.string().uuid(),
        name: z.string(),
        code: z.string().optional(),
      }),
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

  productCategory: z.array(
    z.object({
      id: z.string().uuid(),
      name: z.string(),
      slug: z.string().optional(),
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

export type IFormattedProduct = IProduct & {
  totalSales: number;
  totalRevenue: number;
  productBrand?: IBrand | null;
};

export type IProduct = z.infer<typeof productSchema>;
export type ICreateProduct = z.infer<typeof createProductSchema>;
