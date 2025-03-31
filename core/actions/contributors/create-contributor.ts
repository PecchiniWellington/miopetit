/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { prisma } from "@/core/prisma/prisma";
import {
  contributorSchema,
  IContributor,
} from "@/core/validators/contributors.validator";

export async function createContributor(data: IContributor) {
  const parsed = contributorSchema.safeParse(data);
  if (!parsed.success) throw new Error("Invalid contributor data");

  const { id, users, products, ...rest } = parsed.data;

  const contributor = await prisma.contributor.create({
    data: {
      ...rest,
      slug: rest.slug ?? "",
      tags: rest.tags ?? [],
      animalTypes: rest.animalTypes ?? [],
      needs: rest.needs ?? [],
      socialLinks: rest.socialLinks || {
        instagram: "",
        facebook: "",
        tiktok: "",
      },
      openingHours: rest.openingHours || {},

      isOnlineShop: rest.isOnlineShop ?? false,
      isPickupAvailable: rest.isPickupAvailable ?? false,
      deliveryAvailable: rest.deliveryAvailable ?? false,
      acceptsDonations: rest.acceptsDonations ?? false,
      volunteerNeeded: rest.volunteerNeeded ?? false,

      createdAt: rest.createdAt ? new Date(rest.createdAt) : undefined,
      updatedAt: rest.updatedAt ? new Date(rest.updatedAt) : undefined,
    },
  });

  return contributor;
}
