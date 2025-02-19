"use server";
import { prisma } from "@/core/prisma/prisma";
import { formatError } from "@/lib/utils";

// Delete user address by ID
export const deleteUserAddress = async (addressId: string, userId: string) => {
  try {
    // Verifica che l'indirizzo appartenga all'utente
    const address = await prisma.address.findFirst({
      where: {
        id: addressId,
        userId: userId, // Verifica che l'indirizzo appartenga all'utente
      },
    });

    // Se non trova l'indirizzo, ritorna un errore
    if (!address) {
      return {
        success: false,
        message: "Indirizzo non trovato o non appartiene all'utente",
      };
    }

    // Elimina l'indirizzo
    await prisma.address.delete({
      where: {
        id: addressId,
      },
    });

    return {
      success: true,
      message: "Indirizzo eliminato con successo",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
};
