import { prisma } from "@/core/prisma/prisma";
import { IShippingAddress } from "@/core/validators";
import { updateAddressSchema } from "@/core/validators/user-address.validator";

// Update the user's address
export async function updateUserAddress(data: IShippingAddress) {
  const address = updateAddressSchema.parse(data);

  if (!address.id) {
    console.error("[updateUserAddress] Errore: ID dell'indirizzo non fornito.");
    throw new Error("ID dell'indirizzo non fornito.");
  }

  // 1️⃣ Aggiorna l'indirizzo specifico
  const updatedAddress = await prisma.address.update({
    where: { id: address.id },
    data: {
      street: address.street,
      city: address.city,
      postalCode: address.postalCode,
      country: address.country,
      fullName: address.fullName,
      isDefault: address.isDefault ?? false,
    },
  });

  // 2️⃣ Se l'indirizzo è quello di default, aggiorna il riferimento nell'utente
  if (address.isDefault) {
    const user = await prisma.user.update({
      where: { id: updatedAddress.userId },
      data: {
        defaultAddress: updatedAddress, // 🔹 Corretto, ora punta all'ID
      },
    });

    console.log("[updateUserAddress] Indirizzo di default aggiornato:", user);
  }

  return {
    success: true,
    message: "Indirizzo aggiornato con successo",
    updatedAddress,
  };
}
