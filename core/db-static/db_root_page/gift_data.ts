import { useTranslations } from "next-intl";

export const useGiftData = () => {
  const t = useTranslations("HomePage.BestGift");

  return [
    {
      name: t("toys_treats_more"),
      image: "coccola-tutti.png",
    },
    {
      name: t("dog_gifts"),
      image: "coccola-cani.png",
    },
    {
      name: t("cat_gifts"),
      image: "coccola-gatti.png",
    },
    {
      name: t("small_animal_gifts"),
      image: "coccola-piccoli-animali.png",
    },
    {
      name: t("gifts_for_you"),
      image: "coccola-te.png",
    },
  ];
};
