import { getProductPatologyByProductId } from "@/core/actions/products/product-infos.ts";
import handleError from "@/types/handlers/error";
import { NotFoundError } from "@/types/http-errors";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const account = await getProductPatologyByProductId(id);
    if (!account) throw new NotFoundError("Account");

    return NextResponse.json({ success: true, data: account }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
