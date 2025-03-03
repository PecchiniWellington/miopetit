import type { NextApiRequest, NextApiResponse } from "next";

// Seleziona il servizio di traduzione: "google" o "deepl"
const TRANSLATION_API = "google"; // Cambia in "deepl" se vuoi DeepL

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY; // Salva questa chiave nel `.env.local`
const DEEPL_API_KEY = process.env.DEEPL_API_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { text, targetLang } = req.body;

  if (!text || !targetLang) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  try {
    let translatedText = text; // Default fallback

    if (TRANSLATION_API === "google") {
      const googleRes = await fetch(
        `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ q: text, target: targetLang }),
        }
      );
      const googleData = await googleRes.json();
      translatedText = googleData.data.translations[0].translatedText;
    } else if (TRANSLATION_API === "deepl") {
      const deepLRes = await fetch("https://api-free.deepl.com/v2/translate", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          auth_key: DEEPL_API_KEY || "",
          text: text,
          target_lang: targetLang.toUpperCase(),
        }),
      });
      const deepLData = await deepLRes.json();
      translatedText = deepLData.translations[0].text;
    }

    res.status(200).json({ translatedText });
  } catch (error) {
    console.error("❌ Translation Error:", error);
    res.status(500).json({ error: "Translation service unavailable" });
  }
}
