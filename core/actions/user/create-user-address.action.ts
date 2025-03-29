"use server";
import { auth } from "@/auth";
import { prisma } from "@/core/prisma/prisma";
import {
  createAddressSchema,
  IAddress,
} from "@/core/validators/user-address.validator";
import { formatError } from "@/lib/utils";

// Update the user's address
export async function createUserAddress(req: IAddress) {
  try {
    const session = await auth();
    const currentUser = await prisma.user.findFirst({
      where: {
        id: session?.user?.id,
      },
    });

    if (!currentUser) {
      return {
        success: false,
        message: "Utente non trovato",
      };
    }

    const data = createAddressSchema.parse(req);
    if (data.isDefault) {
      await prisma.address.updateMany({
        where: {
          userId: currentUser.id,
          isDefault: true,
        },
        data: {
          isDefault: false,
        },
      });
    }

    await prisma.address.create({
      data: {
        street: data.street,
        city: data.city,
        fullName: data.fullName,
        country: data.country,
        isDefault: data.isDefault ?? false,
        user: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });

    return { success: true, message: "Address created successfully" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
