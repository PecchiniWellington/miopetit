import { getProductsBySearchTerm } from "@/core/actions/products/product-infos.ts/get-product-by-search-term";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") || "";

    const products = await getProductsBySearchTerm(query);

    console.log("PRODUCT", products);
    return NextResponse.json({ success: true, ...products }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
