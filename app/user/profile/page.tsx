"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Heart, Lock, LogOut, MapPin, ShoppingBag, User } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { AddressesTab } from "./address-tab";
import { FavoritesTab } from "./favorite-tab";
import { OrdersTab } from "./orders-tab";
import { ProfileTab } from "./profile-tabs";
import { SecurityTab } from "./security-tab";

const tabs = [
  { id: "profile", label: "Profilo", icon: <User className="size-5" /> },
  { id: "orders", label: "Ordini", icon: <ShoppingBag className="size-5" /> },
  { id: "favorites", label: "Preferiti", icon: <Heart className="size-5" /> },
  { id: "addresses", label: "Indirizzi", icon: <MapPin className="size-5" /> },
  { id: "security", label: "Sicurezza", icon: <Lock className="size-5" /> },
];

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="container mx-auto flex flex-col gap-8 p-6 md:flex-row">
      {/* 📌 Sidebar */}
      <motion.aside
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="sticky top-20 flex h-fit w-full flex-col rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800 md:w-1/4"
      >
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          🎯 Navigazione Profilo
        </h2>
        <div className="mt-4 space-y-2">
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
            >
              {tab.icon} {tab.label}
            </motion.button>
          ))}
        </div>

        {/* 📌 Logout */}
        <div className="mt-6">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="destructive"
              className="flex w-full items-center gap-2"
              onClick={() => signOut()}
            >
              <LogOut className="size-5" /> Logout
            </Button>
          </motion.div>
        </div>
      </motion.aside>

      {/* 📌 Contenuti */}
      <motion.section
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full overflow-y-auto rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800 md:w-3/4"
        style={{ maxHeight: "calc(100vh - 100px)" }}
      >
        {activeTab === "profile" && <ProfileTab />}
        {activeTab === "orders" && <OrdersTab />}
        {activeTab === "favorites" && <FavoritesTab />}
        {activeTab === "addresses" && <AddressesTab />}
        {activeTab === "security" && <SecurityTab />}
      </motion.section>
    </div>
  );
};

export default ProfilePage;
