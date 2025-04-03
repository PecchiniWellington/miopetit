import { faker } from "@faker-js/faker";
import { AnimalStatus, Gender } from "@prisma/client";

export const generateFakeAnimals = (contributorId: string, count = 10) => {
  return Array.from({ length: count }).map(() => ({
    name: faker.person.firstName(),
    microchipCode: faker.string.alphanumeric(10),
    breed: faker.animal.dog(),
    gender: faker.helpers.arrayElement(["MALE", "FEMALE"]) as Gender,
    age: faker.number.int({ min: 1, max: 15 }),
    intakeDate: faker.date.past(),
    origin: faker.location.city(),
    animalType: faker.helpers.arrayElement(["dog", "cat", "small-animal"]),
    status: faker.helpers.arrayElement([
      "ADOPTABLE",
      "IN_CARE",
      "ADOPTED",
    ]) as AnimalStatus,
    contributorId,
  }));
};
