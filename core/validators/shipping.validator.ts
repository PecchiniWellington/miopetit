import { z } from "zod";

// Schema for the shipping address
export const shippingAddressSchema = z.object({
  fullName: z.string().optional().nullable(),
  street: z.string().min(3, "Address must be at least 3 characters"),
  city: z.string().min(3, "City must be at least 3 characters"),
  zipCode: z.string().min(3, "Postal code must be at least 3 characters"),
  country: z.string().min(3, "Country must be at least 3 characters"),
  lat: z.number().optional().nullable(),
  lng: z.number().optional().nullable(),
});

export type IShippingAddress = z.infer<typeof shippingAddressSchema>;
