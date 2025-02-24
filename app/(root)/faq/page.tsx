"use client";

import { createSupportTicket } from "@/core/actions/support-ticket/create-support-ticket";
import { supportTicketSchema } from "@/core/validators/support-ticket.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  HelpCircle,
  MessageCircle,
  Search,
  Send,
  Shield,
  ShoppingCart,
  Truck,
  X,
} from "lucide-react";
import { startTransition, useState } from "react";
import { useForm } from "react-hook-form";

const faqCategories = [
  { id: "orders", name: "Ordini e Spedizioni", icon: <ShoppingCart /> },
  { id: "shipping", name: "Metodi di Spedizione", icon: <Truck /> },
  { id: "payments", name: "Pagamenti e Fatturazione", icon: <Shield /> },
  { id: "products", name: "Informazioni sui Prodotti", icon: <HelpCircle /> },
];

const faqs = {
  orders: [
    {
      question: "Come posso effettuare un ordine?",
      answer:
        "Puoi effettuare un ordine direttamente dal nostro sito scegliendo i prodotti e procedendo con il checkout.",
    },
    {
      question: "Dove posso controllare lo stato del mio ordine?",
      answer:
        "Puoi controllare lo stato del tuo ordine nella sezione 'I miei ordini' nel tuo profilo.",
    },
    {
      question:
        "Posso modificare o annullare un ordine dopo averlo confermato?",
      answer:
        "Gli ordini possono essere modificati entro 30 minuti dal pagamento. Contatta il supporto per assistenza.",
    },
  ],
  shipping: [
    {
      question: "Quali sono i tempi di spedizione?",
      answer:
        "La spedizione standard impiega 3-5 giorni lavorativi, mentre l'opzione express 24/48 ore.",
    },
    {
      question: "Posso scegliere il corriere di spedizione?",
      answer:
        "Attualmente lavoriamo con più corrieri, ma non è possibile selezionare un corriere specifico.",
    },
  ],
  payments: [
    {
      question: "Quali metodi di pagamento accettate?",
      answer:
        "Accettiamo Visa, Mastercard, PayPal, Klarna e bonifico bancario.",
    },
    {
      question: "Posso pagare alla consegna?",
      answer:
        "Al momento non offriamo il pagamento alla consegna per motivi di sicurezza.",
    },
  ],
  products: [
    {
      question: "I vostri prodotti sono adatti a tutti gli animali?",
      answer:
        "Ogni prodotto è specifico per un tipo di animale. Controlla la descrizione per maggiori dettagli.",
    },
    {
      question: "I cibi per animali sono naturali e senza additivi?",
      answer:
        "Sì, offriamo solo prodotti di alta qualità, con ingredienti naturali e senza conservanti artificiali.",
    },
  ],
};

export default function FAQPage() {
  const [openCategory, setOpenCategory] = useState("orders");
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  // Filtra solo le domande della categoria attiva
  const filteredFaqs = faqs[openCategory].filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Hook per gestire il form
  const form = useForm({
    resolver: zodResolver(supportTicketSchema),
    defaultValues: { subject: "", description: "", email: "", orderId: "" },
  });

  // Funzione per inviare il ticket
  const onSubmit = async (values) => {
    startTransition(async () => {
      setIsPending(true);
      const result = await createSupportTicket(null, values);

      if (result.success) {
        alert("✅ " + result.message);
        form.reset();
        setIsOpen(false);
      }
      setIsPending(false);
    });
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
        ❓ Domande Frequenti
      </h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        Trova risposte rapide ai tuoi dubbi.
      </p>

      {/* 🔍 Search Bar */}
      <div className="relative mt-6 w-full md:w-1/2">
        <Search className="absolute left-3 top-3 text-gray-500" />
        <input
          type="text"
          className="w-full rounded-lg border border-gray-300 px-10 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          placeholder="Cerca una domanda..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* 📌 Categories */}
      <div className="mt-6 flex flex-wrap gap-3">
        {faqCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => {
              setOpenCategory(category.id);
              setSearchTerm(""); // Reset del filtro quando si cambia categoria
            }}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 transition ${
              openCategory === category.id
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-blue-500 hover:text-white"
            }`}
          >
            {category.icon}
            {category.name}
          </button>
        ))}
      </div>

      {/* 📋 FAQ List */}
      <div className="mt-8 space-y-4">
        {filteredFaqs.length === 0 ? (
          <p className="text-center text-gray-500">Nessuna domanda trovata.</p>
        ) : (
          filteredFaqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm transition hover:shadow-md"
            >
              <details className="group">
                <summary className="flex cursor-pointer items-center justify-between font-medium text-gray-800">
                  {faq.question}
                  <ChevronDown className="transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-2 text-gray-600">{faq.answer}</p>
              </details>
            </motion.div>
          ))
        )}
      </div>

      {/* 📞 Contatta il Supporto */}
      <div className="mt-10 w-full text-center">
        {/* 📌 Titolo e descrizione */}
        <div className="mx-auto max-w-lg rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-center shadow-lg">
          {/* 📌 Icona e Testo */}
          <div className="flex flex-col items-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-white shadow-md">
              <MessageCircle className="size-7 text-blue-600" />
            </div>
            <h2 className="mt-4 text-xl font-semibold text-white">
              Hai bisogno di aiuto?
            </h2>
            <p className="mt-1 text-white opacity-90">
              Contatta il nostro team per assistenza.
            </p>
          </div>

          {/* 🔵 Bottone per aprire la modale */}
          <button
            onClick={() => setIsOpen(true)}
            className="mx-auto mt-6 flex w-full max-w-xs items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-blue-600 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <MessageCircle className="size-5" />
            Contatta il Supporto
          </button>
        </div>

        {/* MODALE */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="w-full max-w-lg rounded-lg bg-white p-6 shadow-2xl"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
              >
                {/* HEADER */}
                <div className="flex items-center justify-between border-b pb-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    ✉️ Apri un Ticket di Supporto
                  </h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-500 transition hover:text-gray-800"
                  >
                    <X className="size-6" />
                  </button>
                </div>

                {/* FORM */}
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="mt-4 space-y-4"
                >
                  {/* 📌 Oggetto */}
                  <div className="flex flex-col">
                    <label className="text-left text-sm font-medium text-gray-700">
                      Oggetto della richiesta
                    </label>
                    <input
                      {...form.register("subject")}
                      type="text"
                      className="mt-1 w-full rounded-lg border px-4 py-3 shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                      placeholder="Esempio: Problema con il pagamento"
                    />
                    {form.formState.errors.subject && (
                      <p className="mt-1 text-sm text-red-600">
                        {form.formState.errors.subject.message}
                      </p>
                    )}
                  </div>

                  {/* 📩 Email */}
                  <div className="flex flex-col">
                    <label className="text-left text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      {...form.register("email")}
                      type="email"
                      className="mt-1 w-full rounded-lg border px-4 py-3 shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                      placeholder="Esempio: mionome@email.com"
                    />
                    {form.formState.errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* 🆔 ID Ordine (Opzionale) */}
                  <div className="flex flex-col">
                    <label className="text-left text-sm font-medium text-gray-700">
                      ID Ordine (opzionale)
                    </label>
                    <input
                      {...form.register("orderId")}
                      type="text"
                      className="mt-1 w-full rounded-lg border px-4 py-3 shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                      placeholder="Esempio: 1234 (Opzionale)"
                    />
                    {form.formState.errors.orderId && (
                      <p className="mt-1 text-sm text-red-600">
                        {form.formState.errors.orderId.message}
                      </p>
                    )}
                  </div>

                  {/* ✍️ Descrizione */}
                  <div className="flex flex-col">
                    <label className="text-left text-sm font-medium text-gray-700">
                      Descrizione del problema
                    </label>
                    <textarea
                      {...form.register("description")}
                      rows={4}
                      className="mt-1 w-full rounded-lg border px-4 py-3 shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                      placeholder="Spiega il problema in dettaglio..."
                    />
                    {form.formState.errors.description && (
                      <p className="mt-1 text-sm text-red-600">
                        {form.formState.errors.description.message}
                      </p>
                    )}
                  </div>

                  {/* 🔵 Bottone di invio */}
                  <button
                    type="submit"
                    disabled={isPending}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white shadow-md transition hover:scale-105 hover:bg-blue-700 hover:shadow-lg"
                  >
                    {isPending ? (
                      <div className="size-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    ) : (
                      <>
                        <Send className="size-5" />
                        Invia Ticket
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
