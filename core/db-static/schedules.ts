import { faker } from "@faker-js/faker";
import { Shift } from "@prisma/client";

export const generateFakeSchedules = (userId: string, count = 5) => {
  return Array.from({ length: count }).map(() => ({
    userId,
    date: faker.date.soon({ days: 30 }),
    shift: faker.helpers.arrayElement([
      "MORNING",
      "AFTERNOON",
      "EVENING",
    ]) as Shift,
    notes: faker.lorem.sentence(),
  }));
};
