"use server";

import { auth } from "@/auth";
import { prisma } from "@/core/prisma/prisma";
import { z } from "zod";

const CreateCategoryEventSchema = z.object({
  name: z.string().min(2).max(50),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
});

export async function createCategoryEvent(data: {
  name: string;
  color: string;
}) {
  const parsed = CreateCategoryEventSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Dati categoria non validi",
      error: parsed.error.format(),
    };
  }

  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return {
      success: false,
      message: "Utente non autenticato",
    };
  }

  try {
    const contributor = await prisma.contributor.findFirst({
      where: { users: { some: { id: userId } } },
    });

    if (!contributor) {
      return {
        success: false,
        message: "Nessun contributor associato all'utente",
      };
    }

    const category = await prisma.categoryEvent.create({
      data: {
        name: parsed.data.name,
        color: parsed.data.color,
        contributorId: contributor.id,
      },
    });

    return {
      success: true,
      message: "Categoria creata con successo",
      data: category,
    };
  } catch (error) {
    return {
      success: false,
      message: "Errore nella creazione della categoria",
      error,
    };
  }
}
