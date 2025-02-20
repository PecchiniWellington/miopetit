import { prisma } from "@/core/prisma/prisma";
import addressesData from "../user-address";

// ✅ Funzione per assegnare indirizzi random agli utenti
export async function assignAddressesToUsers() {
  console.log(`⏳ Assigning random addresses to users...`);
  const users = await prisma.user.findMany({ select: { id: true } });
  for (const address of addressesData) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    await prisma.address.create({
      data: { ...address, userId: randomUser.id },
    });
  }
  console.log(`✅ Addresses assigned to users.`);
}
