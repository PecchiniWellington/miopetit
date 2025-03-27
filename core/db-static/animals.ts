import { faker } from "@faker-js/faker";
import { Gender, AnimalStatus } from "@prisma/client";

export const generateFakeAnimals = (contributorId: string, count = 10) => {
  return Array.from({ length: count }).map(() => ({
    name: faker.person.firstName(),
    microchipCode: faker.string.alphanumeric(10),
    breed: faker.animal.dog(),
    gender: faker.helpers.arrayElement(["MALE", "FEMALE"]) as Gender,
    age: faker.number.int({ min: 1, max: 15 }),
    intakeDate: faker.date.past(),
    origin: faker.location.city(),
    status: faker.helpers.arrayElement([
      "ADOPTABLE",
      "IN_CARE",
      "ADOPTED",
    ]) as AnimalStatus,
    contributorId,
  }));
};
