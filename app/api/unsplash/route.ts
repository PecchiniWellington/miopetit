import handleError from "@/types/handlers/error";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = fetch(
      "https://api.unsplash.com/photos/random?client_id=Qy3OtdsgRCtZBUVrvqXYutjDPWN835qsZIJr0Wyd1pM"
    ).then((response) => {
      return response.json();
    });

    return NextResponse.json({ success: true, data: res }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
