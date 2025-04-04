"use server";

import { auth } from "@/auth";
import { prisma } from "@/core/prisma/prisma";
import { z } from "zod";

const updateSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  start: z.string(),
  end: z.string(),
});

export async function updateEvent(data: z.infer<typeof updateSchema>) {
  const session = await auth();

  if (!session?.user) {
    return { success: false, message: "Non autenticato" };
  }

  const parsed = updateSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, message: "Dati non validi", error: parsed.error };
  }

  const updated = await prisma.event.update({
    where: { id: data.id },
    data: {
      title: data.title,
      start: new Date(data.start),
      end: new Date(data.end),
    },
  });

  return { success: true, data: updated };
}
