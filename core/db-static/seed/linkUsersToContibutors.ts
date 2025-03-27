import { prisma } from "@/core/prisma/prisma";
import { Role } from "@prisma/client";

export async function linkUsersToContributors() {
  console.log("🔄 Collegamento utenti esistenti ai contributor...");

  const contributors = await prisma.contributor.findMany();
  const eligibleRoles: Role[] = [
    "ADMIN",
    "VETERINARIAN",
    "VOLUNTEER",
    "RETAILER",
  ];

  // Recupera tutti gli utenti con ruolo tra quelli abilitati
  const users = await prisma.user.findMany({
    where: {
      role: {
        in: eligibleRoles,
      },
    },
  });

  let linked = 0;

  for (const contributor of contributors) {
    // Trova utenti con ruolo compatibile con questo tipo di contributor
    const validRoles =
      contributor.type === "RETAILER"
        ? ["RETAILER", "ADMIN"]
        : ["ADMIN", "VETERINARIAN", "VOLUNTEER"];

    const matchingUsers = users.filter((u) => validRoles.includes(u.role));

    // Associa un subset random di utenti compatibili al contributor
    const selected = matchingUsers.slice(0, 3); // max 3 per contributor

    for (const user of selected) {
      await prisma.$executeRaw`
        INSERT INTO "_UserContributors" ("A", "B")
        VALUES (${user.id}, ${contributor.id})
        ON CONFLICT DO NOTHING;
      `;
      linked++;
    }
  }

  console.log(`✅ ${linked} collegamenti utente-contributor completati`);
}
