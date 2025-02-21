"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, HelpCircle, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const mockTickets = [
  {
    id: "001",
    subject: "Problema con il pagamento",
    status: "In attesa di risposta",
    createdAt: "2025-02-20",
  },
  {
    id: "002",
    subject: "Ordine non ricevuto",
    status: "Risposto",
    createdAt: "2025-02-15",
  },
];

export default function SupportTab() {
  const [tickets, setTickets] = useState(mockTickets);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newTicket, setNewTicket] = useState({
    subject: "",
    message: "",
  });

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setTickets([
        {
          id: Math.random().toString(36).substr(2, 9),
          subject: newTicket.subject,
          status: "In attesa di risposta",
          createdAt: new Date().toISOString().split("T")[0],
        },
        ...tickets,
      ]);
      setNewTicket({ subject: "", message: "" });
      setIsSubmitting(false);
    }, 2000);
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
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            🎟️ I tuoi Ticket di Supporto
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Qui puoi vedere lo stato delle tue richieste di assistenza.
          </p>

          {tickets.length > 0 ? (
            <ul className="mt-3 space-y-3">
              {tickets.map((ticket) => (
                <li
                  key={ticket.id}
                  className="flex items-center justify-between rounded-lg border p-3 transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-900"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {ticket.subject}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Aperto il {ticket.createdAt}
                    </p>
                  </div>
                  <Badge
                    variant={
                      ticket.status === "In attesa di risposta"
                        ? "warning"
                        : "success"
                    }
                  >
                    {ticket.status}
                  </Badge>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Nessun ticket aperto.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Sezione Apertura Nuovo Ticket */}
      <Card className="mt-5 border border-gray-300 dark:border-gray-700">
        <CardContent className="p-5">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            ✉️ Apri un Nuovo Ticket
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Descrivi il tuo problema e il nostro team ti risponderà al più
            presto.
          </p>

          <div className="mt-3 space-y-3">
            <Input
              placeholder="Oggetto della richiesta"
              value={newTicket.subject}
              onChange={(e) =>
                setNewTicket({ ...newTicket, subject: e.target.value })
              }
            />
            <Textarea
              placeholder="Descrivi il tuo problema..."
              rows={4}
              value={newTicket.message}
              onChange={(e) =>
                setNewTicket({ ...newTicket, message: e.target.value })
              }
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !newTicket.subject || !newTicket.message}
            className="mt-4 flex w-full items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white shadow-md transition hover:bg-indigo-700"
          >
            {isSubmitting ? (
              <>
                <AlertTriangle className="size-5 animate-spin" />
                Inoltrando...
              </>
            ) : (
              <>
                <Mail className="size-5" />
                Invia Richiesta
              </>
            )}
          </Button>
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
