"use client";

import BecomePartnerFaq from "@/components/components_page/become_a_partner_page/become_a_partner";
import Hero from "@/components/shared/hero";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart,
  DollarSign,
  HeartHandshake,
  Megaphone,
  ShoppingBag,
  Store,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import partnerContent from "./become-a-partner-content.json";
import partnerContentTab from "./become-a-partner-tab-db.json";

const icons = {
  DollarSign,
  HeartHandshake,
  Store,
  BarChart,
  Megaphone,
  ShoppingBag,
};

export default function BecomePartner() {
  // Verifica che partnerContentTab non sia vuoto
  const [activeTab, setActiveTab] = useState(
    partnerContentTab.length > 0 ? partnerContentTab[0].id : ""
  );

  const scrollRef = useRef<HTMLDivElement>(null);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    window.history.pushState(null, "", `#${tabId}`);
  };

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (partnerContentTab.some((tab) => tab.id === hash)) {
      setActiveTab(hash);
    }
  }, []);

  // Verifica che la tab selezionata esista, altrimenti prendi la prima disponibile
  const activeContent =
    partnerContentTab.find((tab) => tab.id === activeTab) ||
    partnerContentTab[0];

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6">
      {/* 📌 Hero Section */}
      <Hero
        title={partnerContent.hero.title}
        description={partnerContent.hero.description}
      />
      {/* 📌 Tabs */}
      <div className="relative  border-b border-gray-300 dark:border-gray-700">
        <div
          ref={scrollRef}
          className="scrollbar-hide flex space-x-6 overflow-x-auto px-2 py-4 md:justify-center"
        >
          {partnerContentTab.map((tab) => {
            const Icon = icons[tab.icon as keyof typeof icons] || Store; // Fallback icona

            return (
              <motion.button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-1 whitespace-nowrap px-2 py-1 text-base font-medium transition-all md:px-2 ${
                  activeTab === tab.id
                    ? "border-b-4 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-300"
                }`}
              >
                <Icon className="size-6" />
                {tab.label}
              </motion.button>
            );
          })}
        </div>
      </div>
      {/* 📌 Contenuto della Tab Selezionata */}
      {activeContent && (
        <div className=" rounded-2xl bg-white p-10 shadow-lg dark:bg-gray-800">
          <motion.div
            key={activeContent.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center gap-12 md:flex-row">
              <Image
                src={activeContent.image}
                alt={activeContent.label}
                width={450}
                height={350}
                className="rounded-2xl shadow-lg"
              />
              <div className="text-center md:text-left">
                <h3 className="text-3xl font-semibold text-gray-900 dark:text-white">
                  {activeContent.title}
                </h3>
                <p className="mt-4 leading-relaxed text-gray-600 dark:text-gray-300">
                  {activeContent.description}
                </p>
                <ul className="mt-6 space-y-3 text-lg text-gray-600 dark:text-gray-300">
                  {activeContent.points?.map((point, index) => (
                    <li key={index} className="flex items-start gap-2">
                      ✅ {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      {/* 📌 Benefici */}
      <div className=" grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
        {partnerContent.benefits.map((benefit, index) => {
          const Icon = icons[benefit.icon as keyof typeof icons] || Store; // Fallback icona
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center text-center"
            >
              <Icon className="size-12 text-blue-600" />
              <h3 className="mt-6 text-2xl font-semibold">{benefit.title}</h3>
              <p className="mt-2 text-lg text-gray-600">
                {benefit.description}
              </p>
            </motion.div>
          );
        })}
      </div>
      {/* 📌 Testimonianze */}
      <div className=" rounded-2xl bg-gray-100 p-12">
        <h2 className="text-center text-4xl font-bold">
          Cosa Dicono i Nostri Partner?
        </h2>
        <div className="mt-10 flex flex-col space-y-10 sm:flex-row sm:space-x-10 sm:space-y-0">
          {partnerContent.testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center text-center"
            >
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                width={160}
                height={160}
                className="rounded-full shadow-md"
              />
              <p className="mt-6 text-lg italic text-gray-600">
                {testimonial.quote}
              </p>
              <h3 className="mt-4 text-xl font-semibold">{testimonial.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
      {/* 📌 FAQ */}
      {BecomePartnerFaq && <BecomePartnerFaq />}{" "}
      {/* Verifica esistenza componente */}
      {/* 📌 Call to Action */}
      <div className=" text-center">
        <h2 className="text-4xl font-bold">{partnerContent.cta.title}</h2>
        <p className="mt-4 text-lg text-gray-600">
          {partnerContent.cta.description}
        </p>
        <a
          href={partnerContent.cta.button_link}
          className="mt-6 inline-flex items-center rounded-full bg-blue-600 px-8 py-4 text-xl font-semibold text-white shadow-lg transition hover:bg-blue-700"
        >
          {partnerContent.cta.button_text}{" "}
          <ArrowRight className="ml-3 size-6" />
        </a>
      </div>
    </div>
  );
}
