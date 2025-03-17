"use client";

import BecomePartnerFaq from "@/components/components_page/become_a_partner_page/become_a_partner";
import {
  TabsContainer,
  TabsList,
  TabsPanel,
} from "@/components/shared/brand-tabs";
import Hero from "@/components/shared/hero";
import { motion } from "framer-motion";
import {
  DollarSign,
  Globe,
  HeartHandshake,
  Megaphone,
  Store,
} from "lucide-react";
import Image from "next/image";
import partnerContent from "./become-a-partner-content.json";
import partnerContentTab from "./become-a-partner-tab-db.json";

const icons = {
  DollarSign,
  HeartHandshake,
  Store,
  Megaphone,
  Globe,
};

export default function BecomePartner() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6">
      {/* Hero Section */}
      <Hero
        title={partnerContent.hero.title}
        description={partnerContent.hero.description}
      />

      {/* Tabs + Content */}
      <TabsContainer defaultTab={partnerContentTab[0].id}>
        <TabsList
          tabs={partnerContentTab.map((tab) => ({
            id: tab.id,
            label: tab.label,
            icon: icons[tab.icon as keyof typeof icons] || Store,
          }))}
          className="mb-6 justify-center border-b border-gray-300 dark:border-gray-700"
        />

        <div className="rounded-2xl bg-white p-10 shadow-lg dark:bg-gray-800">
          {partnerContentTab.map((tab) => (
            <TabsPanel key={tab.id} tabId={tab.id}>
              <div className="flex flex-col items-center gap-12 md:flex-row">
                <Image
                  src={tab.image}
                  alt={tab.label}
                  width={450}
                  height={350}
                  className="rounded-2xl shadow-lg"
                />
                <div className="text-center md:text-left">
                  <h3 className="text-3xl font-semibold text-gray-900 dark:text-white">
                    {tab.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-gray-600 dark:text-gray-300">
                    {tab.description}
                  </p>
                  <ul className="mt-6 space-y-3 text-lg text-gray-600 dark:text-gray-300">
                    {tab.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-2">
                        ✅ {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsPanel>
          ))}
        </div>
      </TabsContainer>

      {/* Benefits */}
      <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
        {partnerContent.benefits.map((benefit, index) => {
          const Icon = icons[benefit.icon as keyof typeof icons] || Store;
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

      {/* Testimonials */}
      <div className="rounded-2xl bg-gray-100 p-12">
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

      {/* FAQ + CTA */}
      {BecomePartnerFaq && <BecomePartnerFaq />}
      <div className="text-center">
        <h2 className="text-4xl font-bold">{partnerContent.cta.title}</h2>
        <p className="mt-4 text-lg text-gray-600">
          {partnerContent.cta.description}
        </p>
        <a
          href={partnerContent.cta.button_link}
          className="mt-6 inline-flex items-center rounded-full bg-blue-600 px-8 py-4 text-xl font-semibold text-white shadow-lg transition hover:bg-blue-700"
        >
          {partnerContent.cta.button_text}
        </a>
      </div>
    </div>
  );
}
