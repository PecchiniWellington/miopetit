"use server";

import { prisma } from "@/core/prisma/prisma";

export async function deleteUser(userId: string) {
  try {
    await prisma.user.delete({
      where: { id: userId },
    });

    return {
      success: true,
      message: "Utente eliminato con successo",
    };
  } catch (error) {
    return {
      success: false,
      message: "Errore durante l'eliminazione dell'utente",
      error,
    };
  }
}
