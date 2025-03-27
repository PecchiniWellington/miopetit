import { faker } from "@faker-js/faker";
import { InventoryType } from "@prisma/client";

export const generateFakeInventory = (contributorId: string, count = 10) => {
  return Array.from({ length: count }).map(() => ({
    name: faker.commerce.productName(),
    type: faker.helpers.arrayElement([
      "FOOD",
      "MEDICINE",
      "EQUIPMENT",
    ]) as InventoryType,
    quantity: faker.number.int({ min: 5, max: 100 }),
    minQuantity: faker.number.int({ min: 1, max: 10 }),
    unit: "pezzi",
    notes: faker.commerce.productDescription(),
    contributorId,
  }));
};
