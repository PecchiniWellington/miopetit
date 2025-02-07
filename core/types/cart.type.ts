import { z } from "zod";
import { cartItemSchema, insertCartSchema } from "../validators";

export type ICart = z.infer<typeof insertCartSchema>;
export type ICartItem = z.infer<typeof cartItemSchema>;
