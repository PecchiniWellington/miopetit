import { getProductById } from "@/core/actions/products";
import { getAllProductsBySlug } from "@/core/actions/products/get-all-product-by-slug";
import { IQueryParams } from "@/core/actions/types";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  {
    params,
    query,
  }: {
    params: Promise<{ identifier: string }>;
    query: IQueryParams;
  }
) {
  try {
    const { identifier } = await params;
    const isUUID = /^[0-9a-fA-F-]{36}$/.test(identifier);

    const product = isUUID
      ? await getProductById(identifier)
      : await getAllProductsBySlug({
          query,
          slug: identifier,
        });

    return NextResponse.json({ success: true, data: product }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
