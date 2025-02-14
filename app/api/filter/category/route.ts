import { getFiltersForCategory } from "@/core/actions/products/product-infos.ts/get-product-category.action";
import handleError from "@/types/handlers/error";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const filters = await getFiltersForCategory("cani");

    /* console.log("API: ALL FORMATS", accounts); */

    return NextResponse.json({ success: true, data: filters }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
