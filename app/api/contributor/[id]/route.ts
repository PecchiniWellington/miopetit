import { updateContributor } from "@/core/actions/contributors/update-contributor";
import { contributorSchema } from "@/core/validators/contributors.validator";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const body = await req.json();
  const parsed = contributorSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Dati non validi", details: parsed.error },
      { status: 400 }
    );
  }

  const res = await updateContributor({
    ...parsed.data,
    id: context.params.id,
  });
  if (!res.success) {
    return NextResponse.json({ error: res.error }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
