import { z } from "zod";
import { addressSchema } from "./user-address.validator";

// Schema for updating user profile
export const updateUserProfileSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 character"),
  email: z.string().min(3, "Email must be at least 3 character"),
  image: z.string().optional(),
});

export const updateUserSchema = updateUserProfileSchema.extend({
  id: z.string().min(1, "ID is required"),
  role: z.string().min(1, "Role is required"),
  status: z.string().optional(),
});

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.date().nullable().optional(),
  image: z.string().nullable().optional(),
  password: z.string().nullable().optional(),
  role: z.string(),
  defaultAddress: addressSchema,
  address: z.unknown().nullable().optional(), // TODO: Change to IAddress schema
  paymentMethod: z.string().nullable().optional(),
  status: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  accounts: z.array(z.unknown()).optional(), // TODO: Define Account schema
  sessions: z.array(z.unknown()).optional(), // TODO: Define Session schema
  Cart: z.array(z.unknown()).optional(), // TODO: Define Cart schema
  Order: z.array(z.unknown()).optional(), // TODO: Define Order schema
  Review: z.array(z.unknown()).optional(), // TODO: Define Review schema
});

// Schema per la richiesta di reset
export const requestPasswordResetSchema = z.object({
  email: z.string().email("Email non valida"),
});

// Schema per il reset effettivo della password
export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, "Token mancante"),
    newPassword: z.string().min(6, "La password deve avere almeno 6 caratteri"),
    confirmPassword: z
      .string()
      .min(6, "La password deve avere almeno 6 caratteri"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Le password non corrispondono",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email("Inserisci un'email valida"),
});

export type IRequestPasswordReset = z.infer<typeof requestPasswordResetSchema>;
export type IResetPassword = z.infer<typeof resetPasswordSchema>;
export type IUpdateUser = z.infer<typeof updateUserSchema>;
export type IUpdateUserProfile = z.infer<typeof updateUserProfileSchema>;
export type IUser = z.infer<typeof userSchema>;
