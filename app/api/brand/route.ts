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
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
