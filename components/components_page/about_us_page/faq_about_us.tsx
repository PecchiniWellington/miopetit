import AccordionFaq from "@/components/shared/accordion";

const faqs = [
  {
    question: "🐾 Chi è MioPetit?",
    answer:
      "MioPetit è un e-commerce specializzato nella vendita di prodotti di alta qualità per animali domestici. Il nostro obiettivo è migliorare la vita degli animali e dei loro padroni.",
  },
  {
    question: "🌱 Come aiuta il mondo degli animali?",
    answer:
      "Offriamo prodotti eco-friendly, realizzati con materiali sostenibili, per garantire il benessere degli animali e dell'ambiente.",
  },
  {
    question: "🤝 In che modo aiuta anche gli esseri umani?",
    answer:
      "Grazie a un servizio clienti eccellente, prezzi competitivi e prodotti testati, rendiamo più semplice e sicura la cura degli animali domestici per ogni padrone.",
  },
  {
    question: "💳 MioPetit è ecosostenibile anche nei pagamenti?",
    answer:
      "Sì! Offriamo pagamenti digitali sicuri e collaboriamo con circuiti finanziari che promuovono la sostenibilità ambientale.",
  },
];

export default function AboutUsFaq() {
  return (
    <section className="mx-auto w-full max-w-2xl py-12">
      <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white">
        ❓ Domande Frequenti su MioPetit
      </h2>
      <div className="mt-6 space-y-4">
        {faqs.map((faq, index) => (
          <AccordionFaq
            key={index}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
      </div>
    </section>
  );
}
