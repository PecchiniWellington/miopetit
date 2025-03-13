import { DollarSign, Headset, ShoppingBag, WalletCards } from "lucide-react";
import { useTranslations } from "next-intl";

export const useFaq = () => {
  const t = useTranslations("Features");

  return [
    {
      icon: ShoppingBag,
      title: t("free_shipping_title"),
      description: t("free_shipping_description", { amount: "€49" }),
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      icon: DollarSign,
      title: t("money_back_title"),
      description: t("money_back_description"),
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      icon: WalletCards,
      title: t("secure_payment_title"),
      description: t("secure_payment_description"),
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
    {
      icon: Headset,
      title: t("support_title"),
      description: t("support_description"),
      color: "text-red-600",
      bg: "bg-red-100",
    },
  ];
};
