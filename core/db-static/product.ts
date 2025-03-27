import { faker } from "@faker-js/faker";
import { AnimalAge, Prisma } from "@prisma/client"; // ✅ corretto

const animalAges: AnimalAge[] = ["PUPPY", "ADULT", "SENIOR"];

const generateFakeProducts = (count = 500) => {
  return Array.from({ length: count }).map((_, i) => {
    const name = faker.commerce.productName();
    const slug = faker.helpers.slugify(name.toLowerCase()) + `-${i}`;
    const stock = faker.number.int({ min: 0, max: 200 });
    const price = parseFloat(faker.commerce.price({ min: 5, max: 120 }));
    const costPrice = price - faker.number.float({ min: 0.5, max: 5 });
    const discount = faker.number.int({ min: 0, max: 40 });

    return {
      name,
      slug,
      images: [faker.image.urlPicsumPhotos(), faker.image.urlPicsumPhotos()],
      description: faker.commerce.productDescription(),
      shortDescription: faker.commerce.productAdjective(),
      stock,
      price: new Prisma.Decimal(price.toFixed(2)),
      costPrice: new Prisma.Decimal(costPrice.toFixed(2)),
      rating: new Prisma.Decimal(
        faker.number.float({ min: 1, max: 5 }).toFixed(2)
      ),
      numReviews: faker.number.int({ min: 0, max: 100 }),
      isFeatured: faker.datatype.boolean(),
      banner: faker.image.url(),
      animalAge: faker.helpers.arrayElement(animalAges),
      categoryType: faker.helpers.arrayElement([
        "cibo",
        "accessori",
        "cura",
        "gioco",
      ]),
      percentageDiscount: discount,
      createdAt: new Date(),
      updatedAt: new Date(),
      productBrandId: undefined,
      productPathologyId: undefined,
      productUnitFormatId: undefined,
      contributorId: undefined,
      userId: undefined,
    };
  });
};

export default generateFakeProducts;
