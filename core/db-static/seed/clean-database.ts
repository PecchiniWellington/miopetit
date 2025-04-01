import { prisma } from "@/core/prisma/prisma";

export async function cleanDatabase() {
  console.log(`✅ Start cleaning previous database...`);

  await prisma.requestedProduct.deleteMany(); // 🔥 PRIMA di contributor
  await prisma.donation.deleteMany(); // 🔥 se esiste

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

  await prisma.permissionAssignment.deleteMany();
  await prisma.schedule.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.order.deleteMany();
  await prisma.review.deleteMany();
  await prisma.supportTicket.deleteMany();
  await prisma.user.deleteMany();

  await prisma.contributor.deleteMany(); // ✅ ORA è sicuro
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.unitValue.deleteMany();
  await prisma.unitOfMeasure.deleteMany();

  console.log(`✅ Previous data deleted.`);
}
