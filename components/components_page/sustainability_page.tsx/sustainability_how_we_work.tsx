"use client";

import {
  TabsContainer,
  TabsList,
  TabsPanel,
} from "@/components/shared/brand-tabs";
import { motion } from "framer-motion";
import Image from "next/image";
import { sustainabilityTabs } from "./sustainability_how_we_work_db";

export default function SustainabilityHowWeWork() {
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

      <TabsContainer defaultTab="products">
        <TabsList
          tabs={sustainabilityTabs}
          className="mb-6 justify-center border-b border-gray-200 dark:border-gray-700"
        />

        <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
          {sustainabilityTabs.map((tab) => (
            <TabsPanel key={tab.id} tabId={tab.id}>
              <div className="flex flex-col items-center gap-6 md:flex-row">
                <Image
                  src={tab.image}
                  alt={tab.label}
                  width={400}
                  height={300}
                  className="rounded-lg shadow-md"
                />
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {tab.title}
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    {tab.description}
                  </p>
                  <ul className="mt-3 space-y-2 text-gray-600 dark:text-gray-300">
                    {tab.points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsPanel>
          ))}
        </div>
      </TabsContainer>
    </div>
  );
}
