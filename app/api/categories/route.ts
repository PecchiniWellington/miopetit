import { getAllCategories } from "@/core/actions/products/product-infos.ts/get-product-category.action";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await getAllCategories();

    return NextResponse.json({ success: true, ...categories }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
