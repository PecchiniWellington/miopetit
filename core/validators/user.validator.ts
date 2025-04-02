import ROLES from "@/lib/constants/roles";
import { Role } from "@prisma/client";
import { z } from "zod";

export const updateUserProfileSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 character"),
  email: z.string().min(3, "Email must be at least 3 character"),
  image: z.string().optional(),
});

export const updateUserSchema = updateUserProfileSchema.extend({
  id: z.string().min(1, "ID is required"),
  role: z.nativeEnum(Role),
  status: z.string().optional(),
});

export const userSchema = z
  .object({
    id: z.string(),
    name: z.string().optional(),
    email: z.string(),
    emailVerified: z.date().nullable().optional(),
    image: z.string().nullable().optional(),
    password: z.string().nullable().optional(),
    role: z.nativeEnum(Role),
    userSlug: z.string().nullable().optional(),
    defaultAddress: z
      .union([
        z
          .object({
            id: z.string().optional(),
            street: z.string().min(3),
            city: z.string().min(2),
            fullName: z.string().optional().nullable(),
            zipCode: z.string().optional().nullable(),
            country: z.string().min(2),
            isDefault: z.boolean().optional(),
            userId: z.string().optional(),
          })
          .partial(),
        z.null(),
      ])
      .optional(),
    address: z.unknown().nullable().optional(),
    paymentMethod: z.string().nullable().optional(),
    status: z.string(),
    createdAt: z.union([z.string(), z.date()]),
    updatedAt: z.union([z.string(), z.date()]),
    accounts: z.array(z.unknown()).optional(),
    sessions: z.array(z.unknown()).optional(),
    Cart: z.array(z.unknown()).optional(),
    Order: z.array(z.unknown()).optional(),
    Review: z.array(z.unknown()).optional(),
  })
  .refine(
    (data) => data.role !== ROLES.RETAILER || data.userSlug !== undefined,
    {
      message: "userSlug è obbligatorio se il ruolo è Contributor",
      path: ["userSlug"],
    }
  );

export const requestPasswordResetSchema = z.object({
  email: z.string().email("Email non valida"),
});

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
