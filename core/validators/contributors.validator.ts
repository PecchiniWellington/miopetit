// contributor.validator.ts

import { ContributorType } from "@prisma/client";
import { z } from "zod";
import { productSchema } from "./product.validator"; // Adjust the path as needed

export const contributorSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  name: z.string(),
  slug: z.string().optional().nullable(),
  type: z.nativeEnum(ContributorType),
  email: z.string().email().optional().nullable(),
  phone: z.string().optional().nullable(),
  website: z.string().url().optional().nullable(),
  logo: z.string().optional().nullable(),
  coverImage: z.string().optional().nullable(),
  createdAt: z.string().optional().nullable(),
  updatedAt: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  descriptionLong: z.string().optional().nullable(),
  tags: z.array(z.string()).optional().nullable(),
  address: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  province: z.string().optional().nullable(),
  region: z.string().optional().nullable(),
  zipCode: z.string().optional().nullable(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  partitaIva: z.string().optional().nullable(),
  isOnlineShop: z.boolean().optional().nullable(),
  isPickupAvailable: z.boolean().optional().nullable(),
  deliveryAvailable: z.boolean().optional().nullable(),
  openingHours: z.string().optional().nullable(),

  socialLinks: z.record(z.string()).optional().nullable(),
  whatsappNumber: z.string().optional().nullable(),

  animalsAvailable: z.number().optional().nullable(),
  animalTypes: z.array(z.string()).optional().nullable(),

  acceptsDonations: z.boolean().optional().nullable(),
  donationLink: z
    .preprocess(
      (val) => {
        if (val === "") return undefined;
        return val;
      },
      z.string().url({ message: "URL non valido" }).optional()
    )
    .nullable(),
  volunteerNeeded: z.boolean().optional().nullable(),
  needs: z.array(z.string()).optional().nullable(),

  seoTitle: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable(),

  products: productSchema.array().optional(),

  // 👇 aggiunto campo user per visualizzarlo in tabella
  user: z
    .object({
      id: z.string(),
      name: z.string().nullable(),
      email: z.string().nullable(),
    })
    .optional(),

  // 👇 aggiunta per sortable-table
  userEmail: z.string().email().nullable().optional(),
  userName: z.string().nullable().optional(),
});

export type IContributor = z.infer<typeof contributorSchema>;
