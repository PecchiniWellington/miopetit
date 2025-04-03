import { del } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return new NextResponse("Missing image URL", { status: 400 });
    }

    await del(url);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Errore nella cancellazione del blob:", error);
    return new NextResponse("Errore nella cancellazione", { status: 500 });
  }
}
