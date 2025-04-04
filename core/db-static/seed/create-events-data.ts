import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createEvents() {
  const contributors = await prisma.contributor.findMany({
    include: { users: true },
  });

  for (const contributor of contributors) {
    // ✅ Categorie evento per il contributor
    const categories = await Promise.all(
      Array.from({ length: 3 }).map(() =>
        prisma.categoryEvent.create({
          data: {
            name: faker.word.words(1),
            color: faker.color.rgb({ format: "hex" }),
            contributorId: contributor.id,
          },
        })
      )
    );

    const numEvents = faker.number.int({ min: 3, max: 6 });

    for (let i = 0; i < numEvents; i++) {
      const start = faker.date.soon({ days: 30 });
      const end = new Date(start.getTime() + 1000 * 60 * 60); // +1 ora

      await prisma.event.create({
        data: {
          title: faker.hacker.phrase(),
          description: faker.lorem.sentence(),
          start,
          end,
          contributorId: contributor.id,
          categoryEventId: faker.helpers.arrayElement(categories).id,
        },
      });
    }

    console.log(
      `✅ Creati ${numEvents} eventi e ${categories.length} categorie per contributor ${contributor.id}`
    );
  }
}
