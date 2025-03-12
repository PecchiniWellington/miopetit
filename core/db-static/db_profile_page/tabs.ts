import {
  Heart,
  HelpCircle,
  Lock,
  MapPin,
  Settings,
  ShoppingBag,
  User,
} from "lucide-react";
import { useTranslations } from "next-intl";

export const useProfileTabs = () => {
  const t = useTranslations("Profile.sections");
  return [
    { id: "profile", label: t("profile"), icon: User },
    { id: "orders", label: t("orders"), icon: ShoppingBag },
    { id: "favorites", label: t("favorites"), icon: Heart },
    { id: "addresses", label: t("addresses"), icon: MapPin },
    { id: "security", label: t("security"), icon: Lock },
    { id: "support", label: t("support"), icon: HelpCircle },
    /* {
      id: "notifications",
      label: "Notifiche",
      icon: <Bell  />,
    },
    {
      id: "subscriptions",
      label: "Abbonamenti",
      icon: <CreditCard  />,
    }, 
     { id: "history", label: "Cronologia", icon: <Clock  /> },
    */

    {
      id: "settings",
      label: t("settings"),
      icon: Settings,
    },
  ];
};
