"use client";

import { motion } from "framer-motion";
import { CreditCard, Leaf, Package } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const tabs = [
  { id: "products", label: "Prodotti Sostenibili", icon: Leaf },
  { id: "packaging", label: "Packaging Eco-Friendly", icon: Package },
  { id: "payments", label: "Pagamenti Green", icon: CreditCard },
];

export default function SustainabilityHowWeWork() {
  const [activeTab, setActiveTab] = useState("products");
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    window.history.pushState(null, "", `#${tabId}`);
  };

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (tabs.some((tab) => tab.id === hash)) {
      setActiveTab(hash);
    }
  }, []);

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12">
      {/* 📌 Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
          Il nostro impegno per la Sostenibilità 🌍
        </h2>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
          Ogni nostra scelta è pensata per ridurre l&apos;impatto ambientale e
          garantire un futuro migliore per tutti.
        </p>
      </motion.section>

      {/* 📌 Tabs - Scroll orizzontale su mobile */}
      <div className="relative border-b border-gray-200 dark:border-gray-700">
        <div
          ref={scrollRef}
          className="scrollbar-hide flex space-x-4 overflow-x-auto px-2 py-3 md:justify-center"
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 whitespace-nowrap px-4 py-2 text-sm font-medium transition-all md:px-6 ${
                activeTab === tab.id
                  ? "border-b-2 border-green-600 text-green-600 dark:border-green-400 dark:text-green-400"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            >
              <tab.icon className="size-5" />
              {tab.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* 📌 Contenuto delle Tabs */}
      <div className="mt-8 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "products" && (
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <Image
                src="/assets/sustainability/products.jpg"
                alt="Prodotti Sostenibili"
                width={400}
                height={300}
                className="rounded-lg shadow-md"
              />
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  🌱 Prodotti Sostenibili
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Selezioniamo solo prodotti realizzati con ingredienti naturali
                  e materiali riciclati o biodegradabili, per garantire
                  benessere agli animali senza impattare negativamente
                  l&apos;ambiente.
                </p>
                <ul className="mt-3 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>✔️ Alimenti BIO certificati</li>
                  <li>✔️ Giochi e accessori in materiali riciclati</li>
                  <li>✔️ Prodotti cruelty-free e privi di sostanze nocive</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "packaging" && (
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <Image
                src="/assets/sustainability/packaging.jpg"
                alt="Packaging Eco-Friendly"
                width={400}
                height={300}
                className="rounded-lg shadow-md"
              />
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  📦 Packaging Eco-Friendly
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Il nostro packaging è **100% riciclabile e compostabile**,
                  riducendo al minimo l’uso di plastica e materiali non
                  sostenibili. Anche l&apos;inchiostro usato per le stampe è
                  **ecologico e a base vegetale**.
                </p>
                <ul className="mt-3 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>✔️ Scatole in cartone riciclato</li>
                  <li>✔️ Inchiostri a base vegetale</li>
                  <li>✔️ Riduzione degli imballaggi superflui</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "payments" && (
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <Image
                src="/assets/sustainability/payments.jpg"
                alt="Pagamenti Green"
                width={400}
                height={300}
                className="rounded-lg shadow-md"
              />
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  💳 Pagamenti Green
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Collaboriamo con circuiti di pagamento eco-sostenibili che
                  reinvestono parte delle loro commissioni in progetti
                  ambientali. Inoltre, ogni transazione digitale aiuta a
                  **ridurre l’uso della carta**.
                </p>
                <ul className="mt-3 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>✔️ Pagamenti con banche ecosostenibili</li>
                  <li>✔️ Zero emissioni per le transazioni digitali</li>
                  <li>✔️ Partnership con ONG ambientali</li>
                </ul>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
