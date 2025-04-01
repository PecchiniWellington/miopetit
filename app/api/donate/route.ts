// /pages/api/donate.ts

import { prisma } from "@/core/prisma/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  const { userId, requestedProductId, amount, message } = req.body;

  const requestedProduct = await prisma.requestedProduct.findUnique({
    where: { id: requestedProductId },
  });

  if (!requestedProduct)
    return res.status(404).json({ error: "Requested product not found." });

  const newTotal = requestedProduct.fundedAmount + amount;
  const isFunded = newTotal >= requestedProduct.targetAmount;

  await prisma.donation.create({
    data: {
      userId,
      requestedProductId,
      amount,
      message,
    },
  });

  await prisma.requestedProduct.update({
    where: { id: requestedProductId },
    data: {
      fundedAmount: newTotal,
      status: isFunded ? "FUNDED" : "PENDING",
    },
  });

  // (Opzionale) verifica se tutti i prodotti dello shelter sono funded e assegna il badge
  if (isFunded) {
    const requested = await prisma.requestedProduct.findMany({
      where: { contributorId: requestedProduct.contributorId },
    });

    const allFunded = requested.every((r) => r.status === "FUNDED");

    if (allFunded) {
      await prisma.contributor.update({
        where: { id: requestedProduct.contributorId },
        data: { hasFundedBadge: true },
      });
    }
  }

  return res.status(200).json({ success: true });
}
