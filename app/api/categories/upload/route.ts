import { prisma } from "@/db/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Received Data:", body); // DEBUG

    const { categories } = body;
    if (!categories || !Array.isArray(categories)) {
      console.error("Invalid data format");
      return NextResponse.json(
        { message: "Invalid data format" },
        { status: 400 }
      );
    }

    await prisma.category.createMany({
      data: categories,
      skipDuplicates: true,
    });

    return NextResponse.json({ message: "Categories uploaded successfully" });
  } catch (error) {
    console.error("Upload Error:", error); // DEBUG
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    console.log("DB Connection OK, Found Categories:", categories.length);
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ message: "Database Error" }, { status: 500 });
  }
}
