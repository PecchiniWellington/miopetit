import { useTranslations } from "next-intl";

export const useGiftData = () => {
  const t = useTranslations("HomePage.BestGift");

  return [
    {
      name: t("toys_treats_more"),
      image: "coccola_tutti.png",
    },
    {
      name: t("dog_gifts"),
      image: "coccola_cani.png",
    },
    {
      name: t("cat_gifts"),
      image: "coccola_gatti.png",
    },
    {
      name: t("small_animal_gifts"),
      image: "coccola_piccoli_animali.png",
    },
    {
      name: t("gifts_for_you"),
      image: "coccola_te.png",
    },
  ];
};
