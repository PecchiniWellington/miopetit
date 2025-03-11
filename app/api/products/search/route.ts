import { getProductsBySearchTerm } from "@/core/actions/products/product-infos.ts/get-product-by-search-term";
import { NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function POST(req: any) {
  try {
    /*  const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") || ""; */

    const searchTerm = await req.json();
    console.log("QUETY", searchTerm);

    const products = await getProductsBySearchTerm(searchTerm.query);

    console.log("PRODUCT", products);
    return NextResponse.json({ success: true, ...products }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
