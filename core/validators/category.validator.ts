import { z } from "zod";

export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  description: z.string().optional(),
});

export const insertCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().nullable(),
});
export const updateCategorySchema = insertCategorySchema.extend({
  id: z.string().min(1, "Id is required"),
});

export type ICategoryInsert = z.infer<typeof insertCategorySchema>;
export type ICategoryUpdate = z.infer<typeof updateCategorySchema>;
export type ICategory = z.infer<typeof categorySchema>;
