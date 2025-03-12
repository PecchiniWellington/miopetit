"use client";
import { useProfileTabs } from "@/core/db-static/db_profile_page/tabs";
import { ICart, IUser } from "@/core/validators";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { AddressesTab } from "./address-tab";
import { FavoritesTab } from "./favorite-tab";
import { OrdersTab } from "./orders-tab";
import HistoryTab from "./profile-history";
import ProfileNotificationsTab from "./profile-notifications";
import SettingsTab from "./profile-settings";
import SubscriptionTab from "./profile-subscriptions";
import SupportTab from "./profile-support";
import { ProfileTab } from "./profile-tabs";
import { SecurityTab } from "./security-tab";

const ProfileTabsConfig = ({
  user,
  myCart,
}: {
  user: IUser;
  myCart: ICart | null;
}) => {
  const [activeTab, setActiveTab] = useState("profile");
  const tabs = useProfileTabs();

  console.log("🔍 Tabs:", myCart);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Prende l'hash attuale e imposta il tab attivo
      const updateActiveTab = () => {
        const hash = window.location.hash.replace("#", "");
        if (tabs.some((tab) => tab.id === hash)) {
          setActiveTab(hash);
        }
      };

      updateActiveTab(); // Setta la tab all'avvio
      window.addEventListener("hashchange", updateActiveTab); // Ascolta i cambiamenti dell'hash

      return () => {
        window.removeEventListener("hashchange", updateActiveTab);
      };
    }
  }, []);

  const handleActiveTab = (tabId: string) => {
    setActiveTab(tabId);
    window.history.pushState(null, "", `#${tabId}`);
  };

  const t = useTranslations("Profile");

  return (
    <div className="flex w-full flex-col gap-6 md:flex-row">
      {/* 📌 Sidebar */}
      <motion.aside
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="sticky z-10 flex h-fit w-full flex-col rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800 md:top-20 md:w-3/12"
      >
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          🎯 {t("title")}
        </h2>
        <div className="z-40 mt-4">
          {/* Desktop: Navigazione verticale */}
          <div className="hidden space-y-2 sm:block">
            {tabs.map((tab) => (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={tab.id}
                className={`flex w-full items-center gap-3 rounded-md p-3 text-left text-sm font-medium transition-all
                  ${
                    activeTab === tab.id
                      ? "bg-indigo-600 text-white shadow-lg"
                      : "text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                onClick={() => handleActiveTab(tab.id)}
                aria-pressed={activeTab === tab.id}
                aria-label={`Vai alla sezione ${tab.label}`}
              >
                <tab.icon /> {tab.label}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.aside>

      {/* 📌 Contenuti */}
      <motion.section
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full overflow-y-auto rounded-lg bg-white shadow-lg dark:bg-gray-800 md:w-9/12 md:p-6"
        style={{ maxHeight: "calc(100vh - 100px)" }}
      >
        {activeTab === "profile" && <ProfileTab user={user} />}
        {activeTab === "orders" && <OrdersTab />}
        {activeTab === "favorites" && (
          <FavoritesTab user={user} myCart={myCart} />
        )}
        {activeTab === "addresses" && <AddressesTab user={user} />}
        {activeTab === "support" && <SupportTab />}
        {activeTab === "history" && <HistoryTab />}
        {activeTab === "settings" && <SettingsTab />}
        {activeTab === "notifications" && <ProfileNotificationsTab />}
        {activeTab === "subscriptions" && <SubscriptionTab />}
        {activeTab === "security" && (
          <SecurityTab
            email={user.email}
            setIsLoading={() => {}}
            setErrorMessage={() => {}}
            setSuccessMessage={() => {}}
          />
        )}
      </motion.section>
    </div>
  );
};

export default ProfileTabsConfig;
