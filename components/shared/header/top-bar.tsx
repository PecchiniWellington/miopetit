"use client";

import { useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import BrandButton from "../brand-components/brand-button";

export default function TopBar() {
  const locale = useLocale();
  const session = useSession();
  const t = useTranslations("TopBar");

  return (
    <div className="bg-p-reverse w-full px-6 py-2 text-xs text-white">
      <div className="wrapper container mx-auto flex flex-col items-center justify-between gap-2 sm:flex-row">
        {/* 📦 Testo di spedizione */}
        <p className="text-center font-medium tracking-wide">
          {t("free_shipping", { amount: "€49" })}
        </p>

        {/* 🔗 Link Assistenza e Ordini */}
        <div className="flex gap-6">
          <BrandButton
            variant="ghost-white"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              window.location.href = `${session.data?.user.id ? "/user/profile#support" : "/faq"}`;
            }}
          >
            {t("support")}
          </BrandButton>
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
