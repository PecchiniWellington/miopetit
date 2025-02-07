import { z } from "zod";
import { insertCartSchema, cartItemSchema } from "../validators";

export type Cart = z.infer<typeof insertCartSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
