import { prisma } from "@/core/prisma/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, requestedProductId, amount, message } = body;

    if (!userId || !requestedProductId || !amount) {
      return NextResponse.json(
        { error: "Dati mancanti o non validi." },
        { status: 400 }
      );
    }

    const requestedProduct = await prisma.requestedProduct.findUnique({
      where: { id: requestedProductId },
    });

    if (!requestedProduct) {
      return NextResponse.json(
        { error: "Prodotto richiesto non trovato." },
        { status: 404 }
      );
    }

    const newTotal = requestedProduct.fundedAmount + amount;
    const isFunded = newTotal >= requestedProduct.targetAmount;

    // Crea la donazione
    await prisma.donation.create({
      data: {
        userId,
        requestedProductId,
        amount,
        message,
      },
    });

    // Aggiorna lo stato del prodotto richiesto
    await prisma.requestedProduct.update({
      where: { id: requestedProductId },
      data: {
        fundedAmount: newTotal,
        status: isFunded ? "FUNDED" : "PENDING",
      },
    });

    // Se tutti i prodotti dello shelter sono finanziati, assegna il badge
    if (isFunded) {
      const allRequested = await prisma.requestedProduct.findMany({
        where: { contributorId: requestedProduct.contributorId },
      });

      const allFunded = allRequested.every((r) => r.status === "FUNDED");

      if (allFunded) {
        await prisma.contributor.update({
          where: { id: requestedProduct.contributorId },
          data: { hasFundedBadge: true },
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Errore nella donazione:", error);
    return NextResponse.json(
      { error: "Errore interno del server." },
      { status: 500 }
    );
  }
}
