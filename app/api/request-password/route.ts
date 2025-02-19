import { requestPasswordReset } from "@/core/actions/user/request-reset-psw.action";
import handleError from "@/types/handlers/error";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.email) {
      return { success: false, message: "nessuna email trovata" };
    }

    const result = await requestPasswordReset(body.email);

    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
