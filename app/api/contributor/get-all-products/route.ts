import { prisma } from "@/core/prisma/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Affiliate ID ricevuto:", body);

    const schema = z.object({
      affiliateId: z.string(),
    });

    const { affiliateId } = schema.parse(body);

    const data = await prisma.product.findMany({
      where: {
        contributorId: affiliateId,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        price: true,
        images: true,
        description: true,
        shortDescription: true,
        stock: true,
        percentageDiscount: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("❌ API Error:", error);
    return NextResponse.json(
      { error: "Errore interno del server" },
      { status: 500 }
    );
  }
}
