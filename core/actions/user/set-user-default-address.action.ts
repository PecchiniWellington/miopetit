// src/core/actions/user/set-default-address.action.ts
"use server";

import { auth } from "@/auth";
import { prisma } from "@/core/prisma/prisma";
import { formatError } from "@/lib/utils";

// 📌 Imposta l'indirizzo come predefinito e annulla gli altri
export async function setDefaultAddress(id: string, userId: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return {
        success: false,
        message: "Non autorizzato",
      };
    }

    // 📌 Imposta tutti gli altri indirizzi come non predefiniti
    await prisma.address.updateMany({
      where: {
        userId: userId,
      },
      data: {
        isDefault: false,
      },
    });

    // 📌 Imposta l'indirizzo selezionato come predefinito
    await prisma.address.update({
      where: {
        id: id,
      },
      data: {
        isDefault: true,
      },
    });

    return {
      success: true,
      message: "Indirizzo predefinito aggiornato con successo",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}
