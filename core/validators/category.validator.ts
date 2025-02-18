import { z } from "zod";

// ✅ Schema per la Categoria
export const categorySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  parentId: z.string().uuid().nullable().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  description: z.string().optional(),
});

// ✅ Schema per la relazione ProductCategory
export const productCategorySchema = z.object({
  productId: z.string().uuid(),
  categoryId: z.string().uuid(),
  category: categorySchema, // Relazione con la categoria
});

// ✅ Schemi di inserimento e aggiornamento
export const insertCategorySchema = categorySchema.omit({ id: true });
export const updateCategorySchema = insertCategorySchema.extend({
  id: z.string().uuid().min(1, "Id è richiesto"),
});

// ✅ Tipi derivati
export type ICategory = z.infer<typeof categorySchema>;
export type IProductCategory = z.infer<typeof productCategorySchema>;
export type ICategoryInsert = z.infer<typeof insertCategorySchema>;
export type ICategoryUpdate = z.infer<typeof updateCategorySchema>;
