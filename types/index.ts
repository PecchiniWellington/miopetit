import { insertProductSchema } from "@/lib/validator";
import { z } from "zod";

export type Product = z.infer<typeof insertProductSchema> & {
  id: number;
  rating: string;
  createdAt: Date;
};
