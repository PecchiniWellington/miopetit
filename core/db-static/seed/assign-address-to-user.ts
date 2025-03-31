import { prisma } from "@/core/prisma/prisma";
import addressesData from "../user-address";

// ✅ Funzione per assegnare indirizzi random agli utenti
export async function assignAddressesToUsers() {
  console.log(`⏳ Assigning random addresses to users...`);
  const users = await prisma.user.findMany({ select: { id: true } });
  for (const address of addressesData) {
    const randomUser = users[Math.floor(Math.random() * users.length)];

    const userAddresses = await prisma.address.findMany({
      where: { userId: randomUser.id },
    });

    const isFirstAddress = userAddresses.length === 0;

    const createdAddress = await prisma.address.create({
      data: {
        ...address, // assicurati che NON ci sia zipCode se non esiste
        userId: randomUser.id,
      },
    });

    if (isFirstAddress) {
      await prisma.user.update({
        where: { id: randomUser.id },
        data: {
          defaultAddress: {
            connect: { id: createdAddress.id },
          },
        },
      });
    }
  }

  console.log(`✅ Addresses assigned to users.`);
}
