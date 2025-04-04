"use server";

import { auth } from "@/auth";
import { prisma } from "@/core/prisma/prisma";

export async function getAllCategoryEventsByContributor() {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return { success: false, message: "Utente non autenticato" };
  }

  try {
    const contributor = await prisma.contributor.findFirst({
      where: { users: { some: { id: userId } } },
    });

    if (!contributor) {
      return { success: false, message: "Nessun contributor trovato" };
    }

    const categories = await prisma.categoryEvent.findMany({
      where: { contributorId: contributor.id },
      select: {
        id: true,
        name: true,
        color: true,
      },
      orderBy: { name: "asc" },
    });

    return {
      success: true,
      data: categories,
    };
  } catch (error) {
    console.error("Errore nel recupero categorie evento:", error);
    return {
      success: false,
      message: "Errore durante il recupero delle categorie",
    };
  }
}
