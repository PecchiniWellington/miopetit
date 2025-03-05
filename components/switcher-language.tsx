"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const languages = [
  { code: "en", label: "En", flag: "🇬🇧" },
  { code: "it", label: "It", flag: "🇮🇹" },
  { code: "es", label: "Es", flag: "🇪🇸" },
];

export default function LanguageSwitcher() {
  const getDefaultLocale = () => {
    const savedLocale = localStorage.getItem("NEXT_LOCALE");
    if (savedLocale) return savedLocale;

    const browserLang = navigator.language.split("-")[0];
    return languages.some((lang) => lang.code === browserLang)
      ? browserLang
      : "en";
  };

  const [locale, setLocale] = useState<string>("en");

  useEffect(() => {
    const initialLocale = getDefaultLocale();
    setLocale(initialLocale);
  }, []);

  const changeLanguage = (lang: string) => {
    setLocale(lang);
    localStorage.setItem("NEXT_LOCALE", lang);
    window.location.href = `/${lang}`;
  };

  const currentFlag =
    languages.find((lang) => lang.code === locale)?.flag || "🌍";

  return (
    <div className="relative">
      <motion.div className="flex cursor-pointer items-center gap-2 rounded-3xl border bg-white px-2 shadow-sm transition-all hover:shadow-md">
        <span className="text-2xl">{currentFlag}</span>
        <select
          value={locale}
          onChange={(e) => changeLanguage(e.target.value)}
          className="cursor-pointer  bg-transparent font-medium text-gray-700 focus:outline-none"
        >
          {languages.map(({ code, label }) => (
            <option key={code} value={code}>
              {label}
            </option>
          ))}
        </select>
      </motion.div>
    </div>
  );
}
