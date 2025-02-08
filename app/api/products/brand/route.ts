import { getProductBrandByProductId } from "@/core/actions/products/product-infos.ts/get-product-brand.action";
import handleError from "@/types/handlers/error";
import { NotFoundError } from "@/types/http-errors";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  console.log("id", id);
  /*  if (!id) throw new NotFoundError("Account"); */

  try {
    const account = await getProductBrandByProductId(id);
    if (!account) throw new NotFoundError("Account");

    return NextResponse.json({ success: true, data: account }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
