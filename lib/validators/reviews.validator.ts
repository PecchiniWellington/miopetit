import { z } from "zod";

export const insertReviewSchema = z.object({
  title: z.string().nonempty().min(3, "Title is too short"),
  description: z.string().nonempty().min(3, "Description is too short"),
  productId: z.string().min(1, "Product ID is required"),
  userId: z.string().min(1, "User ID is required"),
  rating: z
    .number()
    .int()
    .min(1, "Rating must be between 1 and 5")
    .max(5, "Rating must be between 1 and 5"),
});
