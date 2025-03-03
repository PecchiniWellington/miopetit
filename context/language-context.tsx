"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface LanguageContextProps {
  locale: string;
  changeLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<string>("en");

  useEffect(() => {
    const savedLocale = localStorage.getItem("NEXT_LOCALE") || "en";
    setLocale(savedLocale);
  }, []);

  const changeLanguage = (lang: string) => {
    setLocale(lang);
    localStorage.setItem("NEXT_LOCALE", lang);
    window.location.href = `/${lang}`;
  };

  // Funzione per evitare errori di traduzione
  const t = (key: string) => {
    if (!key) return ""; // Evita errori su valori undefined/null
    return key;
  };

  return (
    <LanguageContext.Provider value={{ locale, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
