import { getFeaturedProducts } from "@/core/actions/products";

import { NotFoundError } from "@/types/http-errors";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const account = await getFeaturedProducts();
    if (!account) throw new NotFoundError("Account");

    return NextResponse.json({ success: true, data: account }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
