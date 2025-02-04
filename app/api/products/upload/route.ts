import { prisma } from "@/db/prisma";
import { mapProductsForDatabase } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    console.log("Received Data:", body); // DEBUG

    const formattedProducts = mapProductsForDatabase(body);
    console.log("formattedProducts", formattedProducts); // DEBUG

    if (body === null || !Array.isArray(body)) {
      console.error("Invalid data format", body);
      return NextResponse.json(
        { message: "Invalid data format" },
        { status: 400 }
      );
    }

    if (body.length === 0) {
      console.error("Empty data array", body);
      return NextResponse.json(
        { message: "Empty data array" },
        { status: 400 }
      );
    }

    await prisma.product.createMany({
      data: formattedProducts,
      skipDuplicates: true,
    });

    return NextResponse.json({ message: "Products uploaded successfully" });
  } catch (error) {
    console.error("Upload Error:", error); // DEBUG
    if (error instanceof Error) {
      console.error("Error Message:", error.message);
      console.error("Stack Trace:", error.stack);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
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
    if (error instanceof Error) {
      console.error("Error Message:", error.message);
      console.error("Stack Trace:", error.stack);
    }
    return NextResponse.json({ message: "Database Error" }, { status: 500 });
  }
}
