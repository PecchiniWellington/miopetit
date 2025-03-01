import { getAllBrands } from "@/core/actions/products/product-infos.ts/get-product-brand.action";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const accounts = await getAllBrands();

    return NextResponse.json(
      { success: true, data: accounts },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
