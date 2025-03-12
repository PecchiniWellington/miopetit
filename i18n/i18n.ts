import { createTranslator } from "next-intl";
import enMessages from "../messages/en.json";
import esMessages from "../messages/es.json";
import itMessages from "../messages/it.json";

// Definisci un oggetto con i file delle traduzioni disponibili
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const messages: Record<string, any> = {
  en: enMessages,
  it: itMessages,
  es: esMessages,
};

// Funzione per ottenere il traduttore in base alla lingua
export function getTranslator(locale: string) {
  return createTranslator({
    locale,
    messages: messages[locale] || messages["en"], // Fallback all'inglese se la lingua non è supportata
  });
}
