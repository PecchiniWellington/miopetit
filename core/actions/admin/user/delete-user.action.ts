"use server";

import { prisma } from "@/core/prisma/prisma";
import { revalidatePath } from "next/cache";

export async function deleteUser(userId: string) {
  try {
    await prisma.user.delete({
      where: { id: userId },
    });

    revalidatePath("/admin/users/all");
    revalidatePath("/admin/users/volunteers");
    revalidatePath("/admin/users/veterinarians");
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
