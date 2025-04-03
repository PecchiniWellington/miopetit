"use server";

import { prisma } from "@/core/prisma/prisma";
import {
  IUpdateUser,
  updateUserSchema,
} from "@/core/validators/user.validator";

export async function createUser(data: IUpdateUser) {
  const parsed = updateUserSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "Dati non validi",
      error: parsed.error.format(),
    };
  }

  try {
    const createdUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        image: data.image || null,
        role: data.role,
        status: data.status || "ACTIVE",
      },
    });

    return {
      success: true,
      message: "Utente creato con successo",
      data: createdUser,
    };
  } catch (error) {
    return {
      success: false,
      message: "Errore nella creazione dell'utente",
      error,
    };
  }
}
