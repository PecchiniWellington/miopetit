"use client";
import { useProfileTabs } from "@/core/db-static/db_profile_page/tabs";
import { ICart, IUser } from "@/core/validators";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
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

  /* SCROLL LATERALE */
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const updateShadows = () => {
      setShowLeftShadow(scrollContainer.scrollLeft > 0);
      setShowRightShadow(
        scrollContainer.scrollLeft <
          scrollContainer.scrollWidth - scrollContainer.clientWidth
      );
    };

    scrollContainer.addEventListener("scroll", updateShadows);
    updateShadows(); // Call on mount

    return () => scrollContainer.removeEventListener("scroll", updateShadows);
  }, []);

  return (
    <div className="flex w-full flex-col gap-6 md:flex-row">
      {/* 📌 Sidebar */}
      <motion.aside
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="sticky z-10 flex h-fit w-full flex-col rounded-lg bg-white  shadow-lg dark:bg-gray-800 md:top-20 md:w-3/12"
      >
        <h2 className="p-6 text-lg font-semibold text-gray-800 dark:text-white">
          🎯 {t("title")}
        </h2>
        <div className="z-40 ">
          {/* Desktop: Navigazione verticale */}
          <div className="border-t border-slate-100 sm:p-6">
            {/* Tabs in modalità normale (Desktop e Tablet) */}
            <div className="hidden   sm:block">
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

            {/* Tabs in modalità compatta (Mobile) */}
            <div className="relative  sm:hidden">
              {/* Ombra sinistra */}
              {showLeftShadow && (
                <div className="pointer-events-none absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-slate-200 to-transparent" />
              )}

              {/* Scroll Container */}
              <div
                ref={scrollRef}
                className="scrollbar-hide flex w-full space-x-4 overflow-x-auto p-4"
              >
                {tabs.map((tab) => (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    key={tab.id}
                    className={`flex items-center justify-center rounded-full p-2 text-gray-600 transition-all hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 ${
                      activeTab === tab.id
                        ? "bg-indigo-600 text-white shadow-lg"
                        : ""
                    }`}
                    onClick={() => {
                      setTimeout(() => handleActiveTab(tab.id), 0);
                    }}
                    aria-pressed={activeTab === tab.id}
                    aria-label={`Vai alla sezione ${tab.label}`}
                  >
                    <tab.icon className="size-6" />
                  </motion.button>
                ))}
              </div>

              {/* Ombra destra */}
              {showRightShadow && (
                <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-slate-200 to-transparent" />
              )}
            </div>
          </div>
        </div>
      </motion.aside>

      {/* 📌 Contenuti */}
      <motion.section
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full overflow-y-auto rounded-lg bg-white dark:bg-gray-800 sm:shadow-lg md:w-9/12 md:p-6"
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
