import { faker } from "@faker-js/faker";
import { InventoryMovementType } from "@prisma/client";

export const generateFakeInventoryMovements = (itemId: string, count = 3) => {
  return Array.from({ length: count }).map(() => ({
    itemId,
    type: faker.helpers.arrayElement(["IN", "OUT"]) as InventoryMovementType,
    quantity: faker.number.int({ min: 1, max: 10 }),
    date: faker.date.recent(),
    note: faker.commerce.productAdjective(),
  }));
};
