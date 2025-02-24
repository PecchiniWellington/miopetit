"use server";
import { auth } from "@/auth";
import { prisma } from "@/core/prisma/prisma";
import { createAddressSchema } from "@/core/validators/user-address.validator";
import { formatError } from "@/lib/utils";

// Update the user's address
export async function createUserAddress(req: any) {
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

    /*  const body = await req.json(); */

    const data = JSON.parse(JSON.stringify(createAddressSchema.parse(req)));
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
        ...data,
        isDefault: data.isDefault ?? false, // Imposta false se undefined
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
