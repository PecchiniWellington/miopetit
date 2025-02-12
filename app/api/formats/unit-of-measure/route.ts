import { getUnitOfMeasure } from "@/core/actions/products/product-infos.ts/get-product-formats.action";
import handleError from "@/types/handlers/error";
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
    return handleError(error, "api") as APIErrorResponse;
  }
}
