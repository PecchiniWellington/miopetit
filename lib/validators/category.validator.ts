import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().nullable(),
});
export const updateCategorySchema = categorySchema.extend({
  id: z.string().min(1, "Id is required"),
});
