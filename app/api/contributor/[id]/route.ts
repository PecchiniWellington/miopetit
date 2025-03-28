import { updateContributor } from "@/core/actions/contributors/update-contributor";
import { contributorSchema } from "@/core/validators/contributors.validator";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json(
      { error: "ID del contributore mancante" },
      { status: 400 }
    );
  }

  const body = await req.json();
  const parsed = contributorSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Dati non validi", details: parsed.error },
      { status: 400 }
    );
  }

  try {
    await updateContributor(parsed.data, id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Errore sconosciuto" },
      { status: 500 }
    );
  }
}
