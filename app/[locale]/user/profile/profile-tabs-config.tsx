"use client";
import { motion } from "framer-motion";
import { JSX, useState } from "react";
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
import { IUser } from "@/core/validators";

interface Tab {
  id: string;
  label: string;
  icon: JSX.Element;
}

const ProfileTabsConfig = ({ tabs, user }: { tabs: Tab[]; user: IUser }) => {
  const [activeTab, setActiveTab] = useState("profile");

  const [, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  return (
    <div className="flex w-full flex-col gap-6 md:flex-row">
      {/* 📌 Navigazione */}
      <motion.aside
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="sticky z-10 flex h-fit w-full flex-col rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800 md:top-20 md:w-3/12"
      >
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          🎯 Navigazione Profilo
        </h2>
        <div className="z-40 mt-4 ">
          {/* Mobile: Orizzontale solo con icone */}
          <div className="flex justify-around sm:hidden">
            {tabs.map((tab) => (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                key={tab.id}
                className={`rounded-full p-2 transition-all
          ${
            activeTab === tab.id
              ? "bg-indigo-600 text-white shadow-lg"
              : "text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
          }`}
                onClick={() => setActiveTab(tab.id)}
                aria-pressed={activeTab === tab.id}
                aria-label={`Vai alla sezione ${tab.label}`}
              >
                {tab.icon}
              </motion.button>
            ))}
          </div>

          {/* Tablet & Desktop: Verticale con icone e testo */}
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
                onClick={() => setActiveTab(tab.id)}
                aria-pressed={activeTab === tab.id}
                aria-label={`Vai alla sezione ${tab.label}`}
              >
                {tab.icon} {tab.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* 📌 Logout */}
        {/* <div className="mt-6">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="destructive"
                className="flex w-full items-center gap-2"
                onClick={() => signOut()}
              >
                <LogOut className="size-5" /> Logout
              </Button>
          </motion.div>
        </div> */}
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
        {activeTab === "favorites" && <FavoritesTab />}
        {activeTab === "addresses" && <AddressesTab user={user} />}
        {activeTab === "support" && <SupportTab />}
        {activeTab === "history" && <HistoryTab />}
        {activeTab === "settings" && <SettingsTab />}
        {activeTab === "notifications" && (
          <ProfileNotificationsTab /* user={user} */ />
        )}
        {activeTab === "subscriptions" && <SubscriptionTab /* user={user} */ />}
        {activeTab === "security" && (
          <SecurityTab
            email={user.email}
            setIsLoading={setIsLoading}
            setErrorMessage={setErrorMessage}
            setSuccessMessage={setSuccessMessage}
          />
        )}
        {/* Messaggio di errore */}
        {errorMessage && (
          <p className="mt-8 text-sm text-red-600">{errorMessage}</p>
        )}

        {/* Messaggio di successo */}
        {successMessage && (
          <p className="mt-8 text-sm text-green-600">{successMessage}</p>
        )}
      </motion.section>
    </div>
  );
};

export default ProfileTabsConfig;
