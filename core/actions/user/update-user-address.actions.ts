import { prisma } from "@/core/prisma/prisma";
import { IShippingAddress } from "@/core/validators";
import { updateAddressSchema } from "@/core/validators/user-address.validator";

// Update the user's address
export async function updateUserAddress(data: IShippingAddress) {
  const address = updateAddressSchema.parse(data);

  // Modifica l'indirizzo esistente
  await prisma.address.update({
    where: {
      id: address.id,
    },
    data: {
      street: address.street,
      city: address.city,
      isDefault: address.isDefault ?? false,
    },
  });

  return { success: true, message: "Address Updated successfully" };
}
