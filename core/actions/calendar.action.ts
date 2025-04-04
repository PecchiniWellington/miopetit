"use server";

import { auth } from "@/auth";
import { prisma } from "@/core/prisma/prisma";
import { z } from "zod";
import { getContributorByUserId } from "./contributors/get-contributor-by-user-id";

const createEventSchema = z.object({
  title: z.string().min(1, "Titolo obbligatorio"),
  description: z.string().optional(),
  start: z.string(), // ISO date string
  end: z.string(), // ISO date string
});

export async function createEvent(data: z.infer<typeof createEventSchema>) {
  const parsed = createEventSchema.safeParse(data);
  const currentUser = await auth();
  const currentUserId = currentUser?.user.id;

  if (!parsed.success) {
    return {
      success: false,
      message: "Dati non validi",
      error: parsed.error.format(),
    };
  }

  try {
    const contributor = await getContributorByUserId(currentUserId!);

    if (!contributor) {
      return {
        success: false,
        message: "Nessun contributor associato all'utente",
      };
    }

    const createdEvent = await prisma.event.create({
      data: {
        title: data.title,
        description: data.description,
        start: new Date(data.start),
        end: new Date(data.end),
        contributorId: contributor.id,
      },
    });

    return {
      success: true,
      message: "Evento creato con successo",
      data: createdEvent,
    };
  } catch (error) {
    return {
      success: false,
      message: "Errore nella creazione dell'evento",
      error,
    };
  }
}

export async function getEventsForCurrentContributor() {
  const currentUser = await auth();
  const contributor = await getContributorByUserId(currentUser?.user.id!);

  if (!contributor) {
    return {
      success: false,
      message: "Nessun contributor associato all'utente",
    };
  }

  try {
    const events = await prisma.event.findMany({
      where: { contributorId: contributor.id },
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
