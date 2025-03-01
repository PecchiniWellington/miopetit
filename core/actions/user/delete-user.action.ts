import { auth, signOut } from "@/auth";
import { prisma } from "@/core/prisma/prisma";
import { revalidatePath } from "next/cache";

export async function deleteUserAccount() {
  try {
    const session = await auth();
    if (!session?.user) {
      return { success: false, message: "Utente non autenticato" };
    }

    const userId = session.user.id;

    // Controlla se l'utente esiste
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return { success: false, message: "L'utente non esiste nel database." };
    }

    console.log("Eliminando utente...");

    try {
      const deletingUser = await prisma.user.delete({
        where: { id: userId },
      });
      console.log("Utente eliminato:", deletingUser);
    } catch (error) {
      const errorMessage = "Errore nell'eliminazione dell'utente.";
      console.error(errorMessage, error);
    }

    console.log("Utente eliminato con successo.");

    revalidatePath("/user/profile");
    revalidatePath("/");
    revalidatePath("/dashboard");
    const signOutTrigger = await signOut();
    console.log("Logout effettuato:", signOutTrigger);

    return { success: true, message: "Account eliminato con successo." };
  } catch (error) {
    return {
      success: false,
      message: "Errore nell'eliminazione dell'account.",
      error: (error as Error).message,
    };
  }
}
