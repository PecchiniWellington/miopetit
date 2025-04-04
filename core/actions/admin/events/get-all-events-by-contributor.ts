"use server";

import { auth } from "@/auth";
import { prisma } from "@/core/prisma/prisma";
import { getContributorByUserId } from "../../contributors/get-contributor-by-user-id";

export async function getAllEventsByContributor() {
  const currentUser = await auth();
  if (!currentUser?.user.id) {
    return {
      success: false,
      message: "Utente non autenticato",
    };
  }

  const contributor = await getContributorByUserId(currentUser.user.id);
  if (!contributor) {
    return {
      success: false,
      message: "Nessun contributor associato",
    };
  }

  try {
    const events = await prisma.event.findMany({
      where: { contributorId: contributor.id ?? undefined },
      orderBy: { start: "asc" },
    });

    return {
      success: true,
      data: events,
    };
  } catch (error) {
    return {
      success: false,
      message: "Errore nel recupero degli eventi",
      error,
    };
  }
}
