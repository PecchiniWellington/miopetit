import { prisma } from "@/core/prisma/prisma";
import { IShippingAddress } from "@/core/validators";
import { updateAddressSchema } from "@/core/validators/user-address.validator";

// Update the user's address
export async function updateUserAddress(data: IShippingAddress) {
  // Log dei dati iniziali ricevuti
  console.log("[updateUserAddress] Data ricevuti:", data);

  // Valida i dati e aggiunge il valore di default per street
  const address = updateAddressSchema.parse(data);

  // Log dell'oggetto address dopo la validazione
  console.log("[updateUserAddress] Address dopo la validazione:", address);

  // Verifica se l'id è definito prima dell'update
  if (!address.id) {
    console.error("[updateUserAddress] Errore: ID dell'indirizzo non fornito.");
    throw new Error("ID dell'indirizzo non fornito.");
  }

  // Log prima di eseguire l'update
  console.log(
    "[updateUserAddress] Sto per aggiornare l'indirizzo con id:",
    address.id
  );

  // Modifica l'indirizzo esistente
  const updatedAddress = await prisma.address.update({
    where: {
      id: address.id,
    },
    data: {
      street: address.street,
      city: address.city,
      postalCode: address.postalCode,
      country: address.country,
      fullName: address.fullName,
      isDefault: address.isDefault ?? false,
    },
  });
  const currentDefaultAddress = await prisma.address.findFirst({
    where: {
      userId: updatedAddress.userId,
      isDefault: true,
    },
  });

  if (currentDefaultAddress && updatedAddress.isDefault) {
    await prisma.address.update({
      where: {
        id: currentDefaultAddress.id,
      },
      data: {
        isDefault: false,
      },
    });
  }

  if (address.isDefault) {
    await prisma.user.update({
      where: {
        id: updatedAddress.userId,
      },
      data: {
        defaultAddress: updatedAddress,
      },
    });
  }

  // Log dopo l'update
  console.log(
    "[updateUserAddress] Indirizzo aggiornato con successo:",
    updatedAddress
  );

  return {
    success: true,
    message: "Address Updated successfully",
    data: updatedAddress,
  };
}
