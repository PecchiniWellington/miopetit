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
  await prisma.inventoryMovement.deleteMany();
  await prisma.inventoryItem.deleteMany();
  await prisma.animal.deleteMany();
  await prisma.animal.deleteMany();

  await prisma.permissionAssignment.deleteMany(); // prima quelli collegati all'utente
  await prisma.schedule.deleteMany(); // se collegati all'utente
  await prisma.cart.deleteMany(); // se collegati all'utente
  await prisma.order.deleteMany(); // se collegati all'utente
  await prisma.review.deleteMany(); // se collegati all'utente
  await prisma.supportTicket.deleteMany(); // idem
  await prisma.user.deleteMany(); // or

  await prisma.contributor.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.unitValue.deleteMany();
  await prisma.unitOfMeasure.deleteMany();
  console.log(`✅ Previous data deleted.`);
}
