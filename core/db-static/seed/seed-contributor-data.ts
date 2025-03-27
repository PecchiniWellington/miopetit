import { prisma } from "@/core/prisma/prisma";
import { generateFakeAnimals } from "../animals";
import { generateFakeInventory } from "../inventory";
import { generateFakeInventoryMovements } from "../inventory-movements";
import { generatePermissionsByRole } from "../permissions-by-role";
import { generateFakeSchedules } from "../schedules";

export async function seedContributorsData() {
  console.log("🚀 Inizio seed dati per contributor...");

  const contributors = await prisma.contributor.findMany({
    include: { users: true },
  });

  for (const contributor of contributors) {
    console.log(`🔧 Popolamento per: ${contributor.name}`);

    // 1. Animali (solo se NON è retailer)
    if (contributor.type !== "RETAILER") {
      const animals = generateFakeAnimals(contributor.id, 10);
      await prisma.animal.createMany({ data: animals });
    }

    // 2. Inventory + Movements (per tutti)
    const inventoryItems = generateFakeInventory(contributor.id, 10);
    const createdItems = await Promise.all(
      inventoryItems.map((item) => prisma.inventoryItem.create({ data: item }))
    );

    for (const item of createdItems) {
      const movements = generateFakeInventoryMovements(item.id, 3);
      await prisma.inventoryMovement.createMany({ data: movements });
    }

    // 3. Permessi + Schedules per ogni utente associato
    for (const user of contributor.users) {
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
