"use server";

import { prisma } from "@/core/prisma/prisma";
import { z } from "zod";

const schema = z.object({
  id: z.string(),
});

export async function deleteEvent(input: z.infer<typeof schema>) {
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    return { success: false, message: "ID non valido" };
  }

  try {
    await prisma.event.delete({ where: { id: input.id } });
    return { success: true };
  } catch (error) {
    return { success: false, message: "Errore durante l'eliminazione", error };
  }
}
