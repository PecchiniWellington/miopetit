// contributor.validator.ts

import { z } from "zod";

export const contributorSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  name: z.string(),
  slug: z.string().optional().nullable(),
  type: z.enum(["PARTNER", "CANILE", "GATTILE"]),
  email: z.string().email().optional().nullable(),
  phone: z.string().optional().nullable(),
  website: z.string().url().optional().nullable(),
  logo: z.string().url().optional().nullable(),
  coverImage: z.string().url().optional().nullable(),
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
  openingHours: z.record(z.string()).optional().nullable(),

  socialLinks: z.record(z.string()).optional().nullable(),
  whatsappNumber: z.string().optional().nullable(),

  animalsAvailable: z.number().optional().nullable(),
  animalTypes: z.array(z.string()).optional().nullable(),

  acceptsDonations: z.boolean().optional().nullable(),
  donationLink: z.string().url().optional().nullable(),
  volunteerNeeded: z.boolean().optional().nullable(),
  needs: z.array(z.string()).optional().nullable(),

  seoTitle: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable(),

  userId: z.string().uuid(),

  products: z
    .array(
      z.object({
        name: z.string(),
        slug: z.string(),
        price: z.number(),
        costPrice: z.number(),
        stock: z.number().optional().nullable(),
        description: z.string().optional().nullable(),
        shortDescription: z.string().optional().nullable(),
        images: z.array(z.string()).optional().nullable(),
        rating: z.number().optional().nullable(),
        numReviews: z.number().optional().nullable(),
        isFeatured: z.boolean().optional().nullable(),
        categoryType: z.string().optional().nullable(),
        percentageDiscount: z.number().optional().nullable(),
        animalAge: z.string().optional().nullable(),
      })
    )
    .optional()
    .nullable(),
});

export type IContributor = z.infer<typeof contributorSchema>;
