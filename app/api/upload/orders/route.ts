import { prisma } from "@/db/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("BODY", body);
    await prisma.order.createMany({
      data: body.data, //TODO: mapOrdersForDatabase(body.data),???
      skipDuplicates: true,
    });

    return NextResponse.json({ message: "Categories uploaded successfully" });
  } catch (error) {
    console.error("Upload Error:", error); // DEBUG
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message || "Unknown error" },
        { status: 500 }
      );
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
    return NextResponse.json({ message: "Database Error" }, { status: 500 });
  }
}
