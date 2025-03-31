import { prisma } from "@/core/prisma/prisma";
import { hashSync } from "bcryptjs"; // opzionale se usi hash finto
import { generateFakeAnimals } from "../animals";
import contributorsData from "../contributors";
import { generateFakeInventory } from "../inventory";
import { generateFakeInventoryMovements } from "../inventory-movements";
import { generatePermissionsByRole } from "../permissions-by-role";
import { generateFakeSchedules } from "../schedules";

export async function seedContributorsData() {
  console.log("🚀 Inizio seed dati per contributor...");

  await prisma.contributor.createMany({ data: contributorsData });

  const contributors = await prisma.contributor.findMany();

  for (const contributor of contributors) {
    console.log(`🔧 Popolamento per: ${contributor.name}`);

    // 👥 Crea utenti base per contributor
    const usersToCreate = [];

    if (contributor.type === "SHELTER") {
      usersToCreate.push("ADMIN", "VOLUNTEER", "VETERINARIAN");
    } else if (contributor.type === "RETAILER") {
      usersToCreate.push("ADMIN");
    }

    await Promise.all(
      usersToCreate.map((role) =>
        prisma.user.create({
          data: {
            email: `${contributor.slug}-${role.toLowerCase()}@example.com`,
            name: `${role} ${contributor.name}`,
            password: hashSync("test123", 10),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            role: role as any,
            contributors: {
              connect: [{ id: contributor.id }],
            },
          },
        })
      )
    );

    // Ricarica i contributor con i loro utenti
    const updatedContributor = await prisma.contributor.findUnique({
      where: { id: contributor.id },
      include: { users: true },
    });

    // 🐶 Animali (solo per SHELTER)
    if (contributor.type !== "RETAILER") {
      const animals = generateFakeAnimals(contributor.id, 10);
      await prisma.animal.createMany({ data: animals });
    }

    // 📦 Inventory + Movimenti
    const inventoryItems = generateFakeInventory(contributor.id, 10);
    const createdItems = await Promise.all(
      inventoryItems.map((item) => prisma.inventoryItem.create({ data: item }))
    );

    for (const item of createdItems) {
      const movements = generateFakeInventoryMovements(item.id, 3);
      await prisma.inventoryMovement.createMany({ data: movements });
    }

    // 🛡️ Permessi + Orari per ogni utente
    for (const user of updatedContributor!.users) {
      const permissions = generatePermissionsByRole(user.id, user.role);
      if (permissions.length) {
        await prisma.permissionAssignment.createMany({ data: permissions });
      }

      if (["VOLUNTEER", "VETERINARIAN", "ADMIN"].includes(user.role)) {
        const schedules = generateFakeSchedules(user.id, 5);
        await prisma.schedule.createMany({ data: schedules });
      }
    }

    console.log(`✅ Dati inseriti per ${contributor.name}`);
  }

  console.log("🎉 Seed completato per tutti i contributor!");
}
