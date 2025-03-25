import { prisma } from "@/core/prisma/prisma";

// ✅ Funzione per eliminare i dati esistenti
export async function cleanDatabase() {
  console.log(`✅ Start cleaning previous database...`);
  await prisma.address.deleteMany();
  await prisma.productCategory.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.productProtein.deleteMany();
  await prisma.productPathology.deleteMany();
  await prisma.productBrand.deleteMany();
  await prisma.user.deleteMany();
  await prisma.contributor.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.unitValue.deleteMany();
  await prisma.unitOfMeasure.deleteMany();
  console.log(`✅ Previous data deleted.`);
}
