import { PrismaClient } from "@prisma/client";
import console from "console";
import megaMenuData from "./mega-menu/mega-menu.json";
import productsData from "./product";
import productBrand from "./product-brand";
import productFeaturesData from "./product-feature";
import productPathology from "./product-pathology";
import productProteins from "./product-proteins";
import unitOfMeasureData from "./unit-of-measure";
import unitValuesData from "./unit-value";
import usersData from "./users";

const prisma = new PrismaClient();

type AnimalAge = "PUPPY" | "ADULT" | "SENIOR";

async function main() {
  console.log(`✅ Start cleaning previous database...`);

  // Drop all tables in the correct order to avoid constraint errors
  await prisma.productCategory.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.productProtein.deleteMany();
  await prisma.productPathology.deleteMany();
  await prisma.productBrand.deleteMany();
  await prisma.user.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.unitValue.deleteMany();
  await prisma.unitOfMeasure.deleteMany();

  console.log(`✅ Previous data deleted.`);

  /** CREATE OTHER DATA **/
  await prisma.unitValue.createMany({ data: unitValuesData });
  await prisma.unitOfMeasure.createMany({ data: unitOfMeasureData });
  await prisma.user.createMany({ data: usersData });
  await prisma.productProtein.createMany({ data: productProteins });

  /** ✅ CREA ProductFeatures EVITANDO DUPLICATI **/
  console.log(`⏳ Creating unique product features...`);
  for (const feature of productFeaturesData) {
    await prisma.productFeatures.upsert({
      where: { name: feature.name },
      update: {},
      create: feature,
    });
  }
  console.log(`✅ Product features created without duplicates.`);

  await prisma.productPathology.createMany({ data: productPathology });
  await prisma.productBrand.createMany({ data: productBrand });

  console.log(`✅ Other data created.`);

  /** CREATE CATEGORIES RECURSIVELY **/
  console.log(`⏳ Creating categories...`);

  async function createCategories(categories, parentId: string | null = null) {
    if (!Array.isArray(categories)) {
      throw new Error("❌ categories non è un array!");
    }

    for (const category of categories) {
      const createdCategory = await prisma.category.create({
        data: {
          name: category.name,
          slug: category.slug,
          parentId: parentId,
        },
      });

      console.log(
        `✅ Created category: ${category.name} (Parent: ${parentId})`
      );

      if (category.children && category.children.length > 0) {
        await createCategories(category.children, createdCategory.id);
      }
    }
  }

  await createCategories(megaMenuData.data);
  console.log(`✅ Categories created successfully!`);

  /** GET ALL DATA FOR PRODUCT CREATION **/
  const categories = await prisma.category.findMany({
    select: { id: true, slug: true },
  });

  if (categories.length === 0) {
    console.error(
      "❌ Nessuna categoria trovata! Assicurati che il seed delle categorie sia stato eseguito correttamente."
    );
    return;
  }

  console.log(
    `✅ Trovate ${categories.length} categorie, assegniamo ai prodotti...`
  );

  const productFeatures = await prisma.productFeatures.findMany({
    select: { id: true },
  });
  const brandData = await prisma.productBrand.findMany({
    select: { id: true },
  });
  const productProteinsData = await prisma.productProtein.findMany({
    select: { id: true },
  });
  const unitValues = await prisma.unitValue.findMany({
    select: { id: true, value: true },
  });
  const unitMeasures = await prisma.unitOfMeasure.findMany({
    select: { id: true, code: true },
  });
  const productPathologies = await prisma.productPathology.findMany({
    select: { id: true },
  });

  /** CREATE PRODUCT UNIT FORMATS **/
  console.log(`⏳ Creating product unit formats...`);
  const productUnitFormats = await Promise.all(
    unitValues.map(async (unitValue) => {
      const randomUnitMeasure =
        unitMeasures[Math.floor(Math.random() * unitMeasures.length)];

      const slug = `${unitValue.value}-${randomUnitMeasure.code}`.toLowerCase();

      return await prisma.productUnitFormat.create({
        data: {
          unitValueId: unitValue.id,
          unitMeasureId: randomUnitMeasure.id,
          slug: slug,
        },
      });
    })
  );
  console.log(`✅ Product unit formats created.`);

  /** CREATE PRODUCTS **/
  console.log(`⏳ Creating products...`);
  for (const product of productsData) {
    if (categories.length === 0) {
      console.error(
        `❌ Errore: impossibile assegnare una categoria a ${product.name}`
      );
      continue;
    }

    const numRandom = Math.floor(Math.random() * 3) + 1;

    const selectedProteins = productProteinsData
      .sort(() => 0.5 - Math.random())
      .slice(0, numRandom);

    const selectedFeature = productFeatures
      .sort(() => 0.5 - Math.random())
      .slice(0, numRandom);

    const randomProductUnitFormat =
      productUnitFormats[Math.floor(Math.random() * productUnitFormats.length)];

    const animalAges = ["PUPPY", "ADULT", "SENIOR"];
    const randomAnimalAge =
      animalAges[Math.floor(Math.random() * animalAges.length)];

    const randomCategory = categories.length
      ? categories[Math.floor(Math.random() * categories.length)]
      : null;

    if (!randomCategory) {
      console.error(
        `❌ Errore: nessuna categoria valida per il prodotto ${product.name}`
      );
      continue;
    }

    // ✅ Seleziona 1-3 patologie casuali
    let randomPathologies = [];
    if (productPathologies.length > 0) {
      const numPathologies = Math.min(
        Math.floor(Math.random() * 3) + 1,
        productPathologies.length
      );
      randomPathologies = productPathologies
        .sort(() => 0.5 - Math.random())
        .slice(0, numPathologies);
    }

    const createdProduct = await prisma.product.create({
      data: {
        ...product,
        animalAge: randomAnimalAge as AnimalAge,
        productCategory: {
          create: {
            category: {
              connect: { id: randomCategory.id },
            },
          },
        },
        productBrand: {
          connect: {
            id: brandData[Math.floor(Math.random() * brandData.length)].id,
          },
        },
        productsFeatureOnProduct: {
          create: selectedFeature.map((feature) => ({
            productFeature: { connect: { id: feature.id } },
          })),
        },
        productUnitFormat: {
          connect: {
            id: randomProductUnitFormat.id,
          },
        },
        productProteinOnProduct: {
          create: selectedProteins.map((protein) => ({
            productProtein: { connect: { id: protein.id } },
          })),
        },
        productPathologyOnProduct: {
          create: randomPathologies.map((pathology) => ({
            pathology: { connect: { id: pathology.id } },
          })),
        },
        // ✅ Inseriamo anche productPathologyId nel modello prodotto!
        productPathologyId:
          randomPathologies.length > 0 ? randomPathologies[0].id : null,
      },
    });

    console.log(
      `✅ Created product: ${createdProduct.name} in category ${randomCategory.slug}`
    );
  }

  console.log("✅ Database seeded successfully 🎉");

  await prisma.$disconnect();
}

main()
  .catch((error) => {
    console.error("❌ Error during seeding:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
