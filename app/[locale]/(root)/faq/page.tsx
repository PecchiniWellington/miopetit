"use client";

import AccordionFaq from "@/components/shared/accordion";
import BrandButton from "@/components/shared/brand-components/brand-button";
import TicketSupport from "@/components/shared/modals/ticket-support";
import { createSupportTicket } from "@/core/actions/support-ticket/create-support-ticket";
import { supportTicketSchema } from "@/core/validators/support-ticket.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence } from "framer-motion";
import { HelpCircle, Search, Shield, ShoppingCart, Truck } from "lucide-react";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

export default function FAQPage() {
  const t = useTranslations("faq");
  const [openCategory, setOpenCategory] = useState("orders_shipping");
  const [searchTerm, setSearchTerm] = useState("");
  const [, setIsPending] = useState(false);
  const [isPending, startTransition] = useTransition();

  const faqCategories = [
    {
      id: "orders_shipping",
      name: t("categories.orders_shipping"),
      icon: <ShoppingCart />,
    },
    {
      id: "shipping_methods",
      name: t("categories.shipping_methods"),
      icon: <Truck />,
    },
    {
      id: "payments_billing",
      name: t("categories.payments_billing"),
      icon: <Shield />,
    },
    {
      id: "product_info",
      name: t("categories.product_info"),
      icon: <HelpCircle />,
    },
  ];

  const faqData = t.raw("questions"); // Carica dinamicamente le FAQ

  const filteredFaqs =
    faqData[openCategory]?.filter((faq: { question: string; answer: string }) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const form = useForm({
    resolver: zodResolver(supportTicketSchema),
    defaultValues: { subject: "", description: "", email: "", orderId: "" },
  });
  const onSubmit = async (values: {
    subject: string;
    description: string;
    email: string;
    orderId: string;
  }) => {
    startTransition(async () => {
      setIsPending(true);
      const result = await createSupportTicket(null, values);
      if (result.success) {
        form.reset();
      }
      setIsPending(false);
    });
  };
  if (!faqCategories.length) notFound();

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
        ❓ {t("title")}
      </h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">{t("subtitle")}</p>

      {/* 🔍 Search Bar */}
      <div className="relative mt-6 flex w-full flex-col items-center justify-center gap-6 sm:flex-row">
        {/* 🔍 Input di ricerca con icona */}
        <div className="relative w-full sm:w-1/2">
          <Search className="absolute left-3 top-3 text-gray-500" />
          <input
            type="text"
            className="w-full rounded-lg border border-gray-300 px-10 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            placeholder={t("search_placeholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* 📞 Bottone per il supporto */}
        <AnimatePresence>
          <TicketSupport
            form={form}
            isPending={isPending}
            onSubmit={onSubmit}
          />
        </AnimatePresence>
      </div>

      {/* 📌 Categories */}
      <div className="mt-6 flex flex-wrap gap-3">
        {faqCategories.map((category) => (
          <BrandButton
            icon={category.icon}
            variant={openCategory === category.id ? "primary" : "flat"}
            onClick={() => {
              setOpenCategory(category.id);
              setSearchTerm("");
            }}
            key={category.id}
          >
            {category.name}
          </BrandButton>
        ))}
      </div>

      {/* 📋 FAQ List */}
      <div className="mt-8 space-y-4">
        {filteredFaqs.length === 0 ? (
          <p className="text-center text-gray-500">{t("no_results")}</p>
        ) : (
          filteredFaqs.map(
            (faq: { question: string; answer: string }, index: number) => (
              <AccordionFaq
                key={index}
                answer={faq.answer}
                question={faq.question}
              />
            )
          )
        )}
      </div>

      {/* MODALE */}
    </div>
  );
}
