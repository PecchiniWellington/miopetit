import { getAllProtein } from "@/core/actions/products/product-infos.ts";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const accounts = await getAllProtein();

    return NextResponse.json(
      { success: true, data: accounts },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
