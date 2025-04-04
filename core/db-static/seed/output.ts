import { prisma } from "@/core/prisma/prisma";
import megaMenuData from "../mega-menu/mega-menu.json";
import { assignAddressesToUsers } from "./assign-address-to-user";
import { cleanDatabase } from "./clean-database";
import { createBaseData } from "./create-base-data";
import { createCategories } from "./create-categories";
import { createEvents } from "./create-events-data";
import { createProductUnitFormats } from "./create-product-unit-form";
import { createProducts } from "./create-products";
import { createRetailerProducts } from "./create-retailer-product";
import { seedRequestedProductsForShelters } from "./create-shetler-request-products";
import { seedContributorsData } from "./seed-contributor-data";
import { seedProductsToContributors } from "./seed-products-to-contributor";

// ✅ Funzione principale
async function main() {
  try {
    await cleanDatabase();
    await createBaseData();

    console.log(`⏳ Creating categories...`);
    await createCategories(megaMenuData.data);
    console.log(`✅ Categories created successfully!`);

    await assignAddressesToUsers();
    const productUnitFormats = await createProductUnitFormats();
    await createProducts(productUnitFormats);
    await createRetailerProducts();
    await seedContributorsData();
    await seedProductsToContributors();
    await seedRequestedProductsForShelters();
    await createEvents();

    console.log(`✅ Database seeded successfully 🎉`);
  } catch (error) {
    console.error("❌ Error during seeding:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Esegui lo script
main();
