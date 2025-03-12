import { CreditCard, MapPin, PackageCheck, User } from "lucide-react";
import { useTranslations } from "next-intl";

export const useCheckoutSteps = () => {
  const t = useTranslations("Checkout");
  return [
    { label: t("steps.login"), href: "sign-in", icon: User },
    {
      label: t("steps.address"),
      href: "shipping-address",
      icon: MapPin,
    },
    {
      label: t("steps.payment"),
      href: "payment-method",
      icon: CreditCard,
    },
    {
      label: t("steps.order"),
      href: "place-order",
      icon: PackageCheck,
    },
  ];
};
