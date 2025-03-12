import { useTranslations } from "next-intl";

export const usePresentationDeals = () => {
  const t = useTranslations("HomePage.PresentationDeals");

  return [
    {
      title: t("deals_under_15"),
      image: "/images/affari-quindici.png",
    },
    {
      title: t("our_best_products"),
      image: "/images/migliori-prodotti.png",
    },
    {
      title: t("buy_3_get_a_gift"),
      image: "/images/prendi-3.png",
    },
    {
      title: t("subscribe_and_save"),
      image: "/images/risparmia-30.png",
    },
  ];
};
