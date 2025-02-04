import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "Nessun file ricevuto" },
        { status: 400 }
      );
    }

    // **Carica il file su Vercel Blob Storage**
    const blob = await put(file.name, file, { access: "public" });

    return NextResponse.json({ url: blob.url }); // Restituisce l'URL dell'immagine caricata
  } catch (error) {
    console.error("Errore nell'upload:", error);
    return NextResponse.json(
      { error: "Errore durante l'upload" },
      { status: 500 }
    );
  }
}
