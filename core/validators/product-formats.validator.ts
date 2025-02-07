import { z } from "zod";

export const insertProductFormat = z.object({
  size: z.string().min(3, "Size must be at least 3 characters"),
});
