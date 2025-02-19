"use server";
import { auth } from "@/auth";
import { prisma } from "@/core/prisma/prisma";
import { createAddressSchema } from "@/core/validators/user-address.validator";
import { formatError } from "@/lib/utils";
import { NextResponse } from "next/server";

// Update the user's address
export async function createUserAddress(req: any) {
  try {
    const session = await auth();
    const currentUser = await prisma.user.findFirst({
      where: {
        id: session?.user?.id,
      },
    });

    console.log("USR", req);

    if (!currentUser) {
      return NextResponse.json(
        { success: false, message: "Utente non trovato" },
        { status: 404 }
      );
    }

    /*  const body = await req.json(); */

    const data = JSON.parse(JSON.stringify(createAddressSchema.parse(req)));

    console.log("SONIO QIU", data);

    const newAddress = await prisma.address.create({
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
