"use client";

import { motion } from "framer-motion";
import { Package, ShoppingBag, Truck } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const tabs = [
  { id: "choose", label: "Scegli il prodotto", icon: ShoppingBag },
  { id: "order", label: "Completa l'ordine", icon: Package },
  { id: "delivery", label: "Ricevi a casa", icon: Truck },
];

export default function AboutUsHowWeWork() {
  const [activeTab, setActiveTab] = useState("choose");
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    window.history.pushState(null, "", `#${tabId}`);
  };

  // Persistenza dello stato delle tabs (opzionale)
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (tabs.some((tab) => tab.id === hash)) {
      setActiveTab(hash);
    }
  }, []);

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12">
      {/* 📌 Intestazione */}
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
          Come funziona MioPetit? 🛍️
        </h2>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
          Un processo semplice e veloce per garantire il meglio per il tuo amico
          a quattro zampe.
        </p>
      </div>

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
                  ? "border-b-2 border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
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
          {activeTab === "choose" && (
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <Image
                src="/assets/how_it_works/choose.jpg"
                alt="Scegli il prodotto"
                width={400}
                height={300}
                className="rounded-lg shadow-md"
              />
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  🛒 Trova il prodotto perfetto
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Naviga nel nostro vasto catalogo e scopri una selezione curata
                  di prodotti di alta qualità per il tuo animale domestico. Dai
                  giochi agli alimenti, tutto è pensato per il loro benessere.
                </p>
                <ul className="mt-3 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>✔️ Prodotti selezionati da esperti</li>
                  <li>
                    ✔️ Filtri intelligenti per trovare ciò di cui hai bisogno
                  </li>
                  <li>✔️ Recensioni reali di altri amanti degli animali</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "order" && (
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <Image
                src="/assets/how_it_works/order.jpg"
                alt="Completa l'ordine"
                width={400}
                height={300}
                className="rounded-lg shadow-md"
              />
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  🛍️ Completa il tuo ordine in pochi click
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Una volta scelti i tuoi prodotti, aggiungili al carrello e
                  inserisci i tuoi dati in un sistema di pagamento sicuro e
                  rapido. Offriamo diverse opzioni di pagamento per venire
                  incontro a ogni esigenza.
                </p>
                <ul className="mt-3 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>✔️ Checkout veloce e sicuro</li>
                  <li>✔️ Pagamenti con carta, PayPal e bonifico</li>
                  <li>✔️ Assistenza disponibile per ogni problema</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "delivery" && (
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <Image
                src="/assets/how_it_works/delivery.jpg"
                alt="Ricevi a casa"
                width={400}
                height={300}
                className="rounded-lg shadow-md"
              />
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  🚚 Spedizione veloce e tracciata
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Il tuo ordine viene processato in tempi rapidi e spedito con
                  corrieri affidabili. Potrai monitorare ogni fase della
                  consegna e ricevere notifiche in tempo reale.
                </p>
                <ul className="mt-3 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>✔️ Consegna in 24-72h</li>
                  <li>✔️ Tracking sempre aggiornato</li>
                  <li>✔️ Opzione di reso facile se necessario</li>
                </ul>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
