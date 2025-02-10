import { getProteinByProductId } from "@/core/actions/products/product-infos.ts/get-product-proteins.action";
import handleError from "@/types/handlers/error";
import { NotFoundError } from "@/types/http-errors";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const account = await getProteinByProductId(id);
    if (!account) throw new NotFoundError("Account");

    return NextResponse.json({ success: true, data: account }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
