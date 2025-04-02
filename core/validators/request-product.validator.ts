import { z } from "zod";

export const requestedProductSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  image: z.string().nullable(),
  price: z.number(),
  quantity: z.number(),
  targetAmount: z.number(),
  fundedAmount: z.number(),
  status: z.enum(["PENDING", "FUNDED", "DELIVERED"]),
  notes: z.string().nullable().optional(),
  shortDescription: z.string().optional(),
  contributor: z.object({
    id: z.string().uuid(),
    name: z.string(),
    slug: z.string(),
    type: z.enum(["SHELTER", "RETAILER", "ASSOCIATION"]),
  }),
  baseProduct: z
    .object({
      id: z.string().uuid(),
      name: z.string(),
      slug: z.string(),
      images: z.array(z.string()).optional(),
      price: z.preprocess(
        (val) => (typeof val === "string" ? parseFloat(val) : val),
        z.number()
      ),
      productBrand: z.object({
        id: z.string().uuid(),
        name: z.string(),
      }),
    })
    .optional()
    .nullable(),
  donations: z
    .array(
      z.object({
        id: z.string().uuid(),
        amount: z.number(),
        createdAt: z.string(),
        user: z
          .object({
            id: z.string().uuid(),
            name: z.string(),
          })
          .nullable(),
      })
    )
    .optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const requestedProductArraySchema = z.array(requestedProductSchema);
export type IRequestedProduct = z.infer<typeof requestedProductSchema>;
// Esempio di union con productSchema:
// import { productSchema } from "@/core/validators";
// export const unifiedProductSchema = z.union([productSchema, requestedProductSchema]);
