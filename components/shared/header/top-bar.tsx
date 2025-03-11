"use client";

import { useSession } from "next-auth/react";
import { useLocale } from "next-intl";
import Link from "next/link";

export default function TopBar() {
  const locale = useLocale();
  const session = useSession();
  return (
    <div className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 px-6 py-2 text-xs text-white">
      <div className="wrapper container mx-auto flex flex-col items-center justify-between gap-2 sm:flex-row">
        {/* 📦 Testo di spedizione */}
        <p className="text-center font-medium tracking-wide">
          🚚 <span className="font-semibold">Spedizione gratuita</span> per
          ordini superiori a <span className="font-semibold">49€!</span>
        </p>

        {/* 🔗 Link Assistenza e Ordini */}
        <div className="flex gap-6">
          <Link
            href={`${session.data?.user.id ? locale + "/user/profile#support" : "/faq"}`}
            className="flex items-center gap-1 transition hover:scale-105 hover:text-yellow-300"
          >
            📞 <span className="hidden sm:inline">Assistenza</span>
          </Link>
          <Link
            href={`/${locale}/user/profile#orders`}
            className="flex items-center gap-1 transition hover:scale-105 hover:text-yellow-300"
          >
            📦 <span className="hidden sm:inline">Stato Ordini</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
