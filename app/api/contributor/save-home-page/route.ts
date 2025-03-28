import { prisma } from "@/core/prisma/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  const { affiliateId, ...rest } = data;

  const page = await prisma.contributorHomePage.upsert({
    where: { contributorId: affiliateId },
    update: { ...rest },
    create: { affiliateId, ...rest },
  });

  return NextResponse.json(page);
}
