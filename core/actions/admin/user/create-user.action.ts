"use server";

import { auth } from "@/auth";
import { prisma } from "@/core/prisma/prisma";
import {
  IUpdateUser,
  updateUserSchema,
} from "@/core/validators/user.validator";
import { getContributorByUserId } from "../../contributors/get-contributor-by-user-id";

export async function createUser(data: IUpdateUser) {
  const parsed = updateUserSchema.safeParse(data);
  const currentUser = await auth();
  const currentUserRole = currentUser?.user.role;

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

    // 🔐 Se l'utente NON è SUPER_ADMIN, collega il nuovo utente al suo contributor
    if (currentUserRole !== "SUPER_ADMIN") {
      const contributor = await getContributorByUserId(
        currentUser?.user.id as string
      );

      if (contributor?.id) {
        await prisma.contributor.update({
          where: { id: contributor.id },
          data: {
            users: {
              connect: { id: createdUser.id },
            },
          },
        });
      }
    }

    return {
      success: true,
      message:
        currentUserRole === "SUPER_ADMIN"
          ? "Utente creato con successo"
          : "Utente creato e associato al contributor",
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
