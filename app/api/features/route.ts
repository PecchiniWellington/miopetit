import { getAllFeatures } from "@/core/actions/products/product-infos.ts";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const accounts = await getAllFeatures();

    return NextResponse.json(
      { success: true, data: accounts },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
