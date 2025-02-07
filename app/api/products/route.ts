import { getAllProducts } from "@/core/actions/products/product.actions";
import handleError from "@/types/handlers/error";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const accounts = await getAllProducts({ page: 1, query: "", category: "" });

    return NextResponse.json(
      { success: true, data: accounts },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
