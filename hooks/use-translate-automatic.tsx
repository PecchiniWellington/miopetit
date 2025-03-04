import { useEffect, useRef, useState } from "react";

// Dizionario di Override per correggere traduzioni errate
const translationOverrides: Record<string, string> = {
  "Cibo Umido": "Wet Food",
  "Cibo Secco": "Dry Food",
  Snack: "Snacks",
  Pannolini: "Diapers",
  "Traversine Igieniche": "Hygienic Pads",
  "Sacchetti Igienici": "Sanitary Bags",
  // Aggiungi altre correzioni necessarie
};

export const useTranslateAutomatic = (
  textOrArray: string | string[],
  targetLang: string = "en"
) => {
  const [translatedText, setTranslatedText] = useState<string | string[]>(
    textOrArray
  );
  const [loading, setLoading] = useState<boolean>(true);
  const hasFetched = useRef(false); // Evita di ritradurre più volte lo stesso testo

  useEffect(() => {
    if (hasFetched.current) return; // Blocca traduzioni ripetute
    hasFetched.current = true; // Segna che ha già tradotto

    const translate = async () => {
      try {
        if (!textOrArray) return;

        if (Array.isArray(textOrArray)) {
          // Traduzione multipla per array di testi
          const translatedResults: string[] = await Promise.all(
            textOrArray.map(async (text) => {
              // 1️⃣ Controlla il dizionario di override
              if (translationOverrides[text]) {
                return translationOverrides[text];
              }

              const cacheKey = `translation_${text}_${targetLang}`;
              const cachedTranslation = localStorage.getItem(cacheKey);

              // 2️⃣ Se c'è già nel localStorage, usalo
              if (cachedTranslation) {
                return cachedTranslation;
              }

              // 3️⃣ Altrimenti, chiama l'API per tradurre
              console.log(`🔍 Fetching translation for: ${text}`);
              const res = await fetch("/api/translate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text, targetLang }),
              });

              if (!res.ok) throw new Error("Translation API error");

              const { translatedText } = await res.json();
              localStorage.setItem(cacheKey, translatedText);
              return translatedText;
            })
          );

          setTranslatedText(translatedResults);
        } else {
          // Traduzione per stringa singola
          const cacheKey = `translation_${textOrArray}_${targetLang}`;

          // 1️⃣ Controlla il dizionario di override
          if (translationOverrides[textOrArray]) {
            setTranslatedText(translationOverrides[textOrArray]);
            setLoading(false);
            return;
          }

          const cachedTranslation = localStorage.getItem(cacheKey);

          // 2️⃣ Se la traduzione esiste già in cache, usala
          if (cachedTranslation) {
            console.log(`✅ Using cached translation for: ${textOrArray}`);
            setTranslatedText(cachedTranslation);
          } else {
            // 3️⃣ Altrimenti, chiama l'API
            console.log(`🔍 Fetching translation for: ${textOrArray}`);
            const res = await fetch("/api/translate", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ text: textOrArray, targetLang }),
            });

            if (!res.ok) throw new Error("Translation API error");

            const { translatedText } = await res.json();
            localStorage.setItem(cacheKey, translatedText);
            setTranslatedText(translatedText);
          }
        }
      } catch (error) {
        console.error("❌ Error in translation:", error);
      } finally {
        setLoading(false);
      }
    };

    translate();
  }, [textOrArray, targetLang]);

  return { translatedText, loading };
};
