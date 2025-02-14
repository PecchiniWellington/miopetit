import { getAllCategories } from "@/core/actions/products/product-infos.ts/get-product-category.action";
import handleError from "@/types/handlers/error";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await getAllCategories();

    return NextResponse.json({ success: true, ...categories }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
