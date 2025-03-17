"use client";

import AccordionFaq from "@/components/shared/accordion";
import BrandButton from "@/components/shared/brand-components/brand-button";
import BrandCard from "@/components/shared/brand-components/brand-card";
import TicketSupport from "@/components/shared/modals/ticket-support";
import {
  createSupportTicket,
  getUserTickets,
} from "@/core/actions/support-ticket/create-support-ticket";
import { supportTicketSchema } from "@/core/validators/support-ticket.validator";
import { formatDateTime } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

interface Ticket {
  id: string;
  subject: string;
  email: string;
  description: string;
  status: "PENDING" | "ANSWERED" | "CLOSED";
  createdAt: string;
}

export default function SupportTab() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("Profile.SupportTab");
  const tStatus = useTranslations("Status.Tickets");
  const tFaq = useTranslations("faq");
  const faqData = tFaq.raw("questions");

  /*  const [tickets, setTickets] = useState(mockTickets); */

  const faqCategories = [
    { id: "orders_shipping" },
    {
      id: "shipping_methods",
    },
    {
      id: "payments_billing",
    },
    {
      id: "product_info",
    },
  ];

  const firstFAQs = faqCategories
    .map(({ id }) => faqData[id]?.[0]) // Prendi solo il primo elemento di ogni categoria
    .filter(Boolean); // Rimuove eventuali categorie senza dati

  useEffect(() => {
    async function fetchTickets() {
      const userTickets = await getUserTickets();
      setTickets(
        userTickets.map((ticket) => ({
          ...ticket,
          createdAt: ticket.createdAt.toISOString(),
        }))
      );
    }
    fetchTickets();
  }, []);

  const form = useForm({
    resolver: zodResolver(supportTicketSchema),
    defaultValues: { subject: "", description: "", email: "", orderId: "" },
  });

  const onSubmit = async (values: {
    subject: string;
    description: string;
    email: string;
    orderId?: string;
  }) => {
    startTransition(async () => {
      const result = await createSupportTicket(null, values);
      if (result.success) {
        const userTickets = await getUserTickets();
        setTickets(
          userTickets.map((ticket) => ({
            ...ticket,
            createdAt: ticket.createdAt.toISOString(),
          }))
        );

        form.reset();
      }
    });
  };

  return (
    <div className="relative rounded-lg bg-white  dark:bg-gray-800">
      <div className="flex flex-col items-center gap-6  sm:flex-row sm:justify-between sm:gap-10">
        {/* Sezione Titolo e Sottotitolo */}
        <div className="w-full text-center sm:text-left">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {t("title")}
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {t("subtitle")}
          </p>
        </div>

        {/* Sezione Bottone Ticket */}
        {/* Modale per il Ticket */}
        <AnimatePresence>
          <TicketSupport
            form={form}
            isPending={isPending}
            onSubmit={onSubmit}
          />
        </AnimatePresence>
      </div>
      {/* Sezione Ticket Aperto */}
      <BrandCard
        title={t("your_tickets")}
        className="mt-5 border-none p-0 shadow-none md:border md:border-gray-300 md:dark:border-gray-700"
      >
        {tickets.length === 0 ? (
          <div className="mt-4 rounded-lg bg-gray-50 p-4 text-center sm:shadow-sm">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t("here_you_can_see_status")}
            </p>
            <p className="mt-4 italic text-gray-500"> {t("no_tickets")}</p>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="rounded-lg bg-gray-100 p-4 transition-all duration-300 hover:shadow-lg dark:bg-gray-800 sm:shadow"
              >
                {/* Oggetto del Ticket */}
                <div className="flex flex-wrap items-center justify-between">
                  <p className="text-base font-semibold">{ticket.subject}</p>
                  <span
                    className={`mt-2 rounded-full px-3 py-1 text-xs font-medium sm:mt-0 ${
                      ticket.status === "PENDING"
                        ? "bg-yellow-200 text-yellow-800"
                        : ticket.status === "ANSWERED"
                          ? "bg-green-200 text-green-800"
                          : "bg-gray-300 text-gray-700"
                    }`}
                  >
                    {tStatus(ticket.status)}
                  </span>
                </div>

                {/* Dettagli del Ticket */}
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {t("open_at")}{" "}
                  {ticket.createdAt &&
                    formatDateTime(ticket.createdAt.toString()).dateTime}
                </p>

                {/* Email dell'utente */}
                <p className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  📧 Email: {ticket.email || "Non specificata"}
                </p>

                {/* Corpo del Messaggio */}
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                  📝 <span className="italic">{ticket.description}</span>
                </p>
              </div>
            ))}
          </div>
        )}
      </BrandCard>

      {/* Sezione Apertura Nuovo Ticket */}

      {/* Sezione FAQ */}
      <BrandCard
        title={
          <>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
              {t("faq_answers")}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t("find_common_questions")}
            </p>
          </>
        }
        className="mt-5 border-none md:border md:border-gray-300 md:dark:border-gray-700"
      >
        {firstFAQs.map((faq, index) => (
          <AccordionFaq
            key={index}
            answer={faq.answer}
            question={faq.question}
          />
        ))}
        <Link href="/faq">
          <BrandButton variant="flat">📖 {t("see_all_faq")}</BrandButton>
        </Link>
      </BrandCard>
    </div>
  );
}
