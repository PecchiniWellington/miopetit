import {
  insertProductSchema,
  insertCartSchema,
  cartItemSchema,
} from "@/lib/validator";
import { z } from "zod";

export type Product = z.infer<typeof insertProductSchema> & {
  id: number;
  rating: string;
  createdAt: Date;
};

export type Cart = z.infer<typeof insertCartSchema> & {};
export type CartItem = z.infer<typeof cartItemSchema> & {};
