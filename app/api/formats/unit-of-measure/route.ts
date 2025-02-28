import { getUnitOfMeasure } from "@/core/actions/products/product-infos.ts/get-product-formats.action";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const accounts = await getUnitOfMeasure();

    /* console.log("API: ALL FORMATS", accounts); */

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
