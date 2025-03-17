"use client";
import { APP_NAME } from "@/lib/constants";
import { getCurrentYear } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";
import BrandButton from "../brand-components/brand-button";

const Footer = () => {
  const t = useTranslations("Footer");
  return (
    <footer className="w-full bg-gray-100 text-gray-700">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-10 md:grid-cols-4">
        {/* 🛍️ Sezione Shop */}
        <div>
          <h3 className="text-lg font-bold text-gray-900">{t("shop")}</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <Link href="/products" className="hover:text-purple-600">
                {t("all_products")}
              </Link>
            </li>
            <li>
              <Link href="/categories" className="hover:text-purple-600">
                {t("categories")}
              </Link>
            </li>
            <li>
              <Link href="/offers" className="hover:text-purple-600">
                {t("special_offers")}
              </Link>
            </li>
            <li>
              <Link href="/new-arrivals" className="hover:text-purple-600">
                {t("new_arrivals")}
              </Link>
            </li>
          </ul>
        </div>

        {/* 📞 Sezione Supporto */}
        <div>
          <h3 className="text-lg font-bold text-gray-900">{t("support")}</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <Link href="/faq" className="hover:text-purple-600">
                {t("faq")}
              </Link>
            </li>
            <li className="-my-6">
              <BrandButton
                variant="ghost"
                className=" text-base font-normal  hover:text-purple-600"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  window.location.href = `/user/profile#orders`;
                }}
              >
                {t("shipping_returns")}
              </BrandButton>
            </li>
            <li>
              <Link href="/contact" className="hover:text-purple-600">
                {t("contact_us")}
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-purple-600">
                {t("terms_conditions")}
              </Link>
            </li>
          </ul>
        </div>

        {/* 🐾 Sezione Azienda */}
        <div>
          <h3 className="text-lg font-bold text-gray-900">MioPetit</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <Link href="/about-us" className="hover:text-purple-600">
                {t("about_us")}
              </Link>
            </li>
            <li>
              <Link href="/sustainability" className="hover:text-purple-600">
                {t("sustainability")}
              </Link>
            </li>
            <li>
              <Link href="/become-a-partner" className="hover:text-purple-600">
                {t("become_partner")}
              </Link>
            </li>
            <li>
              <Link href="/careers" className="hover:text-purple-600">
                {t("careers")}
              </Link>
            </li>
          </ul>
        </div>

        {/* 📬 Sezione Newsletter */}
        <div>
          <h3 className="text-lg font-bold text-gray-900">
            {t("stay_updated")}
          </h3>
          <p className="mt-2 text-sm text-gray-600">{t("newsletter_text")}</p>
          <form className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder={t("email_placeholder")}
              className="w-full flex-1 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500 sm:rounded-l-md sm:rounded-r-none"
            />
            <BrandButton
              type="submit"
              className="w-full rounded-md bg-purple-600 px-4 py-2 text-white transition hover:bg-purple-700 sm:w-auto sm:rounded-l-none sm:rounded-r-md"
            >
              {t("subscribe")}
            </BrandButton>
          </form>
        </div>
      </div>

      {/* 📌 Linea divisoria */}
      <div className="border-t border-gray-300 py-4 text-center text-sm text-gray-600">
        {t("copyright", { year: getCurrentYear(), app_name: APP_NAME })}
      </div>
    </footer>
  );
};

export default Footer;
