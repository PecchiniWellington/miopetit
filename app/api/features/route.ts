import { getAllFeatures } from "@/core/actions/products/product-infos.ts";
import handleError from "@/types/handlers/error";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const accounts = await getAllFeatures();

    return NextResponse.json(
      { success: true, data: accounts },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
