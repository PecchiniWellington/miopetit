import { useTranslations } from "next-intl";
import { useState } from "react";

// Funzione per chiamare l'API di traduzione automatica su Next.js
const fetchTranslation = async (text: string, targetLang: string = "en") => {
  try {
    const res = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, targetLang }),
    });

    if (!res.ok) throw new Error("Translation API error");

    const { translatedText } = await res.json();
    return translatedText;
  } catch (error) {
    console.error("❌ Error in automatic translation:", error);
    return text; // Fallback: usa il testo originale
  }
};

export const useHybridTranslation = () => {
  const t = useTranslations("MegaMenu");
  const [cache, setCache] = useState<{ [key: string]: string }>({});

  return async (slug: string, locale: string = "en") => {
    // Prova la traduzione manuale
    const manualTranslation = t(slug, { defaultValue: null });

    if (manualTranslation) return manualTranslation;

    // Se già tradotto, usa la cache
    if (cache[slug]) return cache[slug];

    // Altrimenti, traduci automaticamente
    const translatedText = await fetchTranslation(
      slug.replace(/-/g, " "),
      locale
    );

    // Salva nella cache
    setCache((prev) => ({ ...prev, [slug]: translatedText }));

    return translatedText;
  };
};
