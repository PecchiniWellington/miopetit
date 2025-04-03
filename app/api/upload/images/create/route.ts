import { put } from "@vercel/blob";
import crypto from "crypto"; // ✅ per generare un ID unico
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = formData.get("folder")?.toString();

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "Nessun file valido ricevuto" },
        { status: 400 }
      );
    }

    // 🔑 Genera un nome file unico per evitare conflitti
    const ext = file.name.split(".").pop();
    const uniqueName = `blob-${crypto.randomUUID()}.${ext || "png"}`;
    const filename = folder ? `${folder}/${uniqueName}` : uniqueName;

    const blob = await put(filename, file, { access: "public" });

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error("❌ Errore nell'upload:", error);
    return NextResponse.json(
      { error: "Errore durante l'upload" },
      { status: 500 }
    );
  }
}
