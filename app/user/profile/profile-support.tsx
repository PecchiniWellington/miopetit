"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  createSupportTicket,
  getUserTickets,
} from "@/core/actions/support-ticket/create-support-ticket";
import { supportTicketSchema } from "@/core/validators/support-ticket.validator";
import { formatDateTime } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { HelpCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

interface Ticket {
  id: string;
  subject: string;
  email: string;
  description: string;
  status: "PENDING" | "RESPONDED" | "CLOSED";
  createdAt: string;
}

export default function SupportTab() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isPending, startTransition] = useTransition();
  /*  const [tickets, setTickets] = useState(mockTickets); */

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
        📞 Supporto & Assistenza
      </h2>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Hai bisogno di aiuto? Apri un ticket o consulta le domande frequenti.
      </p>

      {/* Sezione Ticket Aperto */}
      <Card className="mt-5 border border-gray-300 dark:border-gray-700">
        <CardContent className="p-5">
          <h2 className="text-lg font-bold">🎟️ I tuoi Ticket di Supporto</h2>
          {tickets.length === 0 ? (
            <div className="mt-4 rounded-lg bg-gray-50 p-4 text-center shadow-sm">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Qui puoi vedere lo stato delle tue richieste di assistenza.
              </p>
              <p className="mt-4 italic text-gray-500">Nessun ticket aperto</p>
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
                          : ticket.status === "RESPONDED"
                            ? "bg-green-200 text-green-800"
                            : "bg-gray-300 text-gray-700"
                      }`}
                    >
                      {ticket.status === "PENDING"
                        ? "In attesa di risposta"
                        : ticket.status === "RESPONDED"
                          ? "Risposto"
                          : "Chiuso"}
                    </span>
                  </div>

                  {/* Dettagli del Ticket */}
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Aperto il{" "}
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
            <h2 className="text-lg font-bold">📩 Apri un Nuovo Ticket</h2>
            <p className="text-sm text-gray-500">
              Descrivi il tuo problema e il nostro team ti risponderà al più
              presto.
            </p>

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
                placeholder="Oggetto della richiesta"
                className="w-full rounded-lg border p-3"
              />
              {form.formState.errors.subject && (
                <p className="mt-1 text-sm text-red-600">
                  {form.formState.errors.subject.message}
                </p>
              )}
              <input
                {...form.register("email")}
                placeholder="La tua mail: user@email.it"
                className="w-full rounded-lg border p-3"
              />
              {form.formState.errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {form.formState.errors.email.message}
                </p>
              )}
              <input
                {...form.register("orderId")}
                placeholder="N° Ordine: 123456 (Opzionale)"
                className="w-full rounded-lg border p-3"
              />
              {form.formState.errors.orderId && (
                <p className="mt-1 text-sm text-red-600">
                  {form.formState.errors.orderId?.message}
                </p>
              )}
              <textarea
                {...form.register("description")}
                placeholder="Descrivi il tuo problema..."
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
                📨 Invia Richiesta
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>

      {/* Sezione FAQ */}
      <Card className="mt-5 border border-gray-300 dark:border-gray-700">
        <CardContent className="p-5">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            ❓ Domande Frequenti (FAQ)
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Trova risposte alle domande più comuni.
          </p>

          <ul className="mt-3 space-y-3 text-sm text-gray-700 dark:text-gray-300">
            <li className="flex items-center gap-2">
              <HelpCircle className="size-5 text-blue-500" />
              <Link href="/faq#pagamenti" className="hover:underline">
                Problemi con il pagamento?
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <HelpCircle className="size-5 text-blue-500" />
              <Link href="/faq#spedizioni" className="hover:underline">
                Dove si trova il mio ordine?
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <HelpCircle className="size-5 text-blue-500" />
              <Link href="/faq#resi" className="hover:underline">
                Come posso effettuare un reso?
              </Link>
            </li>
          </ul>

          <Link href="/faq">
            <Button className="mt-4 flex w-full items-center gap-2 rounded-lg bg-gray-600 px-4 py-2 text-white shadow-md transition hover:bg-gray-700">
              📖 Vedi tutte le FAQ
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
