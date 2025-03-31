/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from "@/core/prisma/prisma";
import { contributorSchema } from "@/core/validators/contributors.validator";
import { NextResponse } from "next/server";

async function updateContributor(id: string, data: unknown) {
  const parsed = contributorSchema.partial().safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid contributor update data");
  }

  // 🔒 Destructure to remove non-updatable fields
  const {
    id: _id,
    userName,
    userEmail,
    users,
    products,
    ...rest
  } = parsed.data;

  const safeData = Object.fromEntries(
    Object.entries(rest).filter(([_, value]) => value !== null)
  );

  return prisma.contributor.update({
    where: { id },
    data: safeData,
  });
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, ...data } = body;

    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing contributor ID" },
        { status: 400 }
      );
    }

    const updatedContributor = await updateContributor(id, data);
    return NextResponse.json(updatedContributor);
  } catch (error) {
    console.error("Error updating contributor:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
