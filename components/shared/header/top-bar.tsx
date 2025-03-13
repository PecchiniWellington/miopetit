"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

export default function TopBar() {
  const locale = useLocale();
  const session = useSession();
  const t = useTranslations("TopBar");

  return (
    <div className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 px-6 py-2 text-xs text-white">
      <div className="wrapper container mx-auto flex flex-col items-center justify-between gap-2 sm:flex-row">
        {/* 📦 Testo di spedizione */}
        <p className="text-center font-medium tracking-wide">
          {t("free_shipping", { amount: "€49" })}
        </p>

        {/* 🔗 Link Assistenza e Ordini */}
        <div className="flex gap-6">
          <Button
            /*   href={`${session.data?.user.id ? locale + "/user/profile#support" : "/faq"}`} */
            className={`flex items-center gap-1 transition hover:scale-105 hover:text-yellow-300`}
            onClick={(e) => {
              e.preventDefault();
              window.location.href = `${session.data?.user.id ? "/user/profile#support" : "/faq"}`;
            }}
          >
            {t("support")}
          </Button>
          <Link
            href={`/${locale}/user/profile#orders`}
            className={`flex items-center gap-1 transition hover:scale-105 hover:text-yellow-300 `}
          >
            {t("order_status")}
          </Link>
        </div>
      </div>
    </div>
  );
}
