import { z } from "zod";

// Schema per Address
export const baseAddressSchema = z.object({
  id: z.string().optional(),
  street: z.string().min(3),
  city: z.string().min(2),
  fullName: z.string().optional().nullable(),
  zipCode: z.string().min(5),
  country: z.string().min(2),
  isDefault: z.boolean().optional(),
  userId: z.string().optional(),
});

export const addressSchema = baseAddressSchema.nullable().optional();

export const createAddressSchema = baseAddressSchema.omit({ id: true });
export const updateAddressSchema = addressSchema;

export type IAddress = z.infer<typeof addressSchema>;
export type ICreateAddress = z.infer<typeof createAddressSchema>;
export type IUpdateAddress = z.infer<typeof updateAddressSchema>;
