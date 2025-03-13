"use client";

import AccordionFaq from "@/components/shared/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  createSupportTicket,
  getUserTickets,
} from "@/core/actions/support-ticket/create-support-ticket";
import { supportTicketSchema } from "@/core/validators/support-ticket.validator";
import { formatDateTime } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
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
    <div className="relative rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
        {t("title")}
      </h2>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {t("subtitle")}
      </p>

      {/* Sezione Ticket Aperto */}
      <Card className="mt-5 border border-gray-300 dark:border-gray-700">
        <CardContent className="p-5">
          <h2 className="text-lg font-bold"> {t("your_tickets")}</h2>
          {tickets.length === 0 ? (
            <div className="mt-4 rounded-lg bg-gray-50 p-4 text-center shadow-sm">
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
                  className="rounded-lg bg-gray-100 p-4 shadow transition-all duration-300 hover:shadow-lg dark:bg-gray-800"
                >
                  {/* Oggetto del Ticket */}
                  <div className="flex items-center justify-between">
                    <p className="text-base font-semibold">{ticket.subject}</p>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
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
        </CardContent>
      </Card>

      {/* Sezione Apertura Nuovo Ticket */}
      <Card className="mt-5 border border-gray-300 dark:border-gray-700">
        <CardContent className="p-5">
          <div className="rounded-lg border bg-gray-50 p-4">
            <h2 className="text-lg font-bold">📩 {t("open_ticket")} </h2>
            <p className="text-sm text-gray-500">{t("describe_your_issue")} </p>

            <form
              onSubmit={form.handleSubmit(
                (data) => {
                  console.log("✅ Dati inviati:", data);
                  onSubmit(data);
                },
                (errors) => {
                  console.log("❌ Errori nel form:", errors);
                }
              )}
              className="mt-4 space-y-4"
            >
              <input
                {...form.register("subject")}
                placeholder={t("subject_of_request")}
                className="w-full rounded-lg border p-3"
              />
              {form.formState.errors.subject && (
                <p className="mt-1 text-sm text-red-600">
                  {form.formState.errors.subject.message}
                </p>
              )}
              <input
                {...form.register("email")}
                placeholder={t("your_email")}
                className="w-full rounded-lg border p-3"
              />
              {form.formState.errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {form.formState.errors.email.message}
                </p>
              )}
              <input
                {...form.register("orderId")}
                placeholder={t("n_order")}
                className="w-full rounded-lg border p-3"
              />
              {form.formState.errors.orderId && (
                <p className="mt-1 text-sm text-red-600">
                  {form.formState.errors.orderId?.message}
                </p>
              )}
              <textarea
                {...form.register("description")}
                placeholder={t("describe_your_request")}
                className="w-full rounded-lg border p-3"
              ></textarea>
              {form.formState.errors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {form.formState.errors.description.message}
                </p>
              )}

              <Button
                type="submit"
                disabled={isPending}
                className="w-full bg-indigo-600 text-white"
              >
                {t("send_ticket")}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>

      {/* Sezione FAQ */}
      <Card className="mt-5 border border-gray-300 dark:border-gray-700">
        <CardContent className="p-5">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            {t("faq_answers")}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t("find_common_questions")}
          </p>

          {firstFAQs.map((faq, index) => (
            <AccordionFaq
              key={index}
              answer={faq.answer}
              question={faq.question}
            />
          ))}
          <Link href="/faq">
            <Button className="mt-4 flex w-full items-center gap-2 rounded-lg bg-gray-600 px-4 py-2 text-white shadow-md transition hover:bg-gray-700">
              📖 {t("see_all_faq")}
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
