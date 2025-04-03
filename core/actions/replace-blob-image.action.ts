"use server";

import { del } from "@vercel/blob";

export async function replaceBlobImage({
  newImageUrl,
  previousImageUrl,
}: {
  newImageUrl: string;
  previousImageUrl?: string;
}): Promise<string> {
  try {
    // Elimina l'immagine precedente se esiste
    if (previousImageUrl && previousImageUrl.startsWith("https://")) {
      await del(previousImageUrl);
    }

    // Carica la nuova immagine
    const file = await fetch(newImageUrl).then((res) => res.blob());
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload/images", {
      method: "POST",
      body: formData,
    });

    const json = await response.json();
    if (!json.url) throw new Error("Upload fallito");

    return json.url;
  } catch (err) {
    console.error("❌ Errore in replaceBlobImage action:", err);
    throw err;
  }
}
