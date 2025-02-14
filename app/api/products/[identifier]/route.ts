import { getProductById } from "@/core/actions/products";
import { getAllProductsBySlug } from "@/core/actions/products/get-all-product-by-slug";
import handleError from "@/types/handlers/error";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ identifier: string }> }
) {
  try {
    const { identifier } = await params;
    const isUUID = /^[0-9a-fA-F-]{36}$/.test(identifier);

    const product = isUUID
      ? await getProductById(identifier)
      : await getAllProductsBySlug({ query: "all", slug: identifier, page: 1 });

    return NextResponse.json({ success: true, data: product }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
