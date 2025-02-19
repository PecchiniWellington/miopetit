import { z } from "zod";

// Schema per Address
export const addressSchema = z.object({
  id: z.string().optional(),
  street: z.string().min(3, "La via deve avere almeno 3 caratteri"),
  city: z.string().min(2, "La città deve avere almeno 2 caratteri"),
  isDefault: z.boolean().optional(),
});

export const createAddressSchema = addressSchema.omit({ id: true });
export const updateAddressSchema = addressSchema;

export type IAddress = z.infer<typeof addressSchema>;
export type ICreateAddress = z.infer<typeof createAddressSchema>;
export type IUpdateAddress = z.infer<typeof updateAddressSchema>;
