import { getAllCategories } from "@/core/actions/products/product-infos.ts/get-product-category.action";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await getAllCategories();

    return NextResponse.json({ success: true, ...categories }, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
