import { IBrand } from "@/types/index";
import { z } from "zod";
import { categorySchema } from "./category.validator";
import { orderItemSchema } from "./orders.validator";
import { productUnitFormatSchema } from "./unitsFormat.validator";

// Schema per il modello Product
export const productSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3, "Il nome deve avere almeno 3 caratteri"),
  slug: z.string().min(3, "Lo slug deve avere almeno 3 caratteri"),
  images: z.array(
    z.string().min(1, "Il prodotto deve avere almeno 1 immagine")
  ),
  description: z
    .string()
    .min(3, "La descrizione deve avere almeno 3 caratteri"),
  stock: z.number().nullable().default(0),
  price: z.string(),
  rating: z.number().nullable().optional(),
  banner: z.string().nullable(),
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
  productCategory: z
    .array(
      z.object({
        productId: z.string().uuid(),
        categoryId: z.string().uuid(),
        category: categorySchema,
      })
    )
    .optional(),
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

// Schema per i prodotti più recenti
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
  image: z.array(z.string()),
});

// Definizione dei tipi
export type IProduct = z.infer<typeof productSchema> & {
  productProteinOnProduct: {
    productId: string;
    productProteinId: string;
    productProtein: { id: string; name: string };
  }[];
  productUnitFormat?: z.infer<typeof productUnitFormatSchema> | null;
  productsFeatureOnProduct: {
    productId: string;
    productFeatureId: string;
    productFeature: {
      id: string;
      name: string;
      description: string | null;
    };
  }[];
  productPathologyOnProduct: {
    productId: string;
    pathologyId: string;
    pathology: { id: string; name: string };
  }[];
  category?: {
    id: string;
    name: string;
    slug: string;
    parentId?: string | null;
  }[];

  productBrand?: IBrand;
};

// Schema per la formattazione dei prodotti
export const formattedProductSchema = z.object({
  totalSales: z.number(),
  totalRevenue: z.number(),
  productCategory: z.array(
    z.object({
      id: z.string().uuid(),
      name: z.string(),
      slug: z.string(),
      parentId: z.string().uuid().nullable().optional(),
    })
  ),
  productBrand: z
    .object({
      id: z.string().uuid(),
      name: z.string(),
    })
    .nullable(),
  productPathologies: z.array(
    z.object({
      id: z.string().uuid(),
      name: z.string(),
    })
  ),
  productFeatures: z.array(
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
  productProteinOnProduct: z
    .array(
      z.object({
        productId: z.string().uuid(),
        productProteinId: z.string().uuid(),
        productProtein: z.array(
          z.object({
            id: z.string().uuid(),
            name: z.string(),
          })
        ),
      })
    )
    .optional(),

  productPathologyOnProduct: z
    .array(
      z.object({
        productId: z.string().uuid(),
        pathologyId: z.string().uuid(),
        pathology: z.object({
          id: z.string().uuid(),
          name: z.string(),
        }),
      })
    )
    .optional(),
});

export type IFormattedProduct = IProduct & {
  totalSales: number;
  totalRevenue: number;
  productBrand?: IBrand | null;
};
export type IInsertProduct = z.infer<typeof insertProductSchema>;
export type IUpdateProduct = z.infer<typeof updateProductSchema>;
export type ILatestProduct = z.infer<typeof latestProductSchema> & {
  productBrand?: IBrand;
};
