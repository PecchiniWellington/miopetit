import { getFiltersForCategory } from "@/core/actions/products/product-infos.ts/get-product-category.action";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const filters = await getFiltersForCategory("cani");

    /* console.log("API: ALL FORMATS", accounts); */

    return NextResponse.json({ success: true, data: filters }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
