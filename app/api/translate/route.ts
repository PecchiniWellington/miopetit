import { NextRequest, NextResponse } from "next/server";

const DEEPL_API_KEY = process.env.DEEPL_API_KEY;

export async function POST(req: NextRequest) {
  try {
    console.log("✅ API Translate chiamata!");

    const { text, targetLang } = await req.json();

    if (!text || !targetLang) {
      console.warn("⚠️ Parametri mancanti:", { text, targetLang });
      return NextResponse.json(
        { error: "Missing parameters" },
        { status: 400 }
      );
    }

    console.log("🔍 Testo da tradurre:", text, " Lingua:", targetLang);

    // Chiama DeepL API
    const response = await fetch("https://api-free.deepl.com/v2/translate", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        auth_key: DEEPL_API_KEY!,
        text,
        target_lang: targetLang.toUpperCase(),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ DeepL API Error:", errorText);
      return NextResponse.json({ error: "DeepL API failed" }, { status: 500 });
    }

    const data = await response.json();
    const translatedText = data.translations?.[0]?.text || text;

    console.log("✅ Traduzione completata:", translatedText);
    return NextResponse.json({ translatedText });
  } catch (error) {
    console.error("❌ Server Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
