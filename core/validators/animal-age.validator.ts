import { z } from "zod";

export const insertAnimalAgeSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
});

export type IAnimalAge = z.infer<typeof insertAnimalAgeSchema>;
