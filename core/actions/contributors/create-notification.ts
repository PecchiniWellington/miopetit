import { prisma } from "@/core/prisma/prisma";
import { IProduct } from "@/core/validators";

export async function createNotification(
  requestedProductId: string,
  requestedProduct: IProduct
) {
  const donations = await prisma.donation.findMany({
    where: { requestedProductId },
  });

  for (const donation of donations) {
    if (!donation.userId) continue;

    await prisma.notification.create({
      data: {
        userId: donation.userId,
        message: `🎁 Il prodotto "${requestedProduct.name}" che hai aiutato a finanziare è stato spedito!`,
      },
    });
  }
}
