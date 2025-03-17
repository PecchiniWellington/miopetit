"use client";

import {
  TabsContainer,
  TabsList,
  TabsPanel,
} from "@/components/shared/brand-tabs";
import Image from "next/image";
import { howWeWorkTabs } from "./how_we_work_db";

export default function AboutUsHowWeWork() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12">
      {/* Header */}
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
          Come funziona MioPetit? 🛍️
        </h2>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
          Un processo semplice e veloce per garantire il meglio per il tuo amico
          a quattro zampe.
        </p>
      </div>

      <TabsContainer defaultTab="choose">
        <TabsList
          tabs={howWeWorkTabs}
          className="mb-6 justify-center border-b border-gray-200 dark:border-gray-700"
        />

        <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
          {howWeWorkTabs.map((tab) => (
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
