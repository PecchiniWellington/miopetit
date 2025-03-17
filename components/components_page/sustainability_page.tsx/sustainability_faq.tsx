import AccordionFaq from "@/components/shared/accordion";

const faqs = [
  {
    question: "🌿 I vostri prodotti sono realmente sostenibili?",
    answer:
      "Sì! Tutti i nostri prodotti sono realizzati con materiali eco-friendly, biodegradabili o riciclati, senza sostanze tossiche.",
  },
  {
    question: "📦 Il packaging è davvero privo di plastica?",
    answer:
      "Abbiamo eliminato il 99% della plastica dai nostri imballaggi e utilizziamo solo cartone riciclato e materiali compostabili.",
  },
  {
    question: "🚚 Come funziona la vostra spedizione a impatto zero?",
    answer:
      "Compensiamo le emissioni di CO2 delle spedizioni finanziando progetti di riforestazione e trasporti sostenibili.",
  },
  {
    question: "💳 Quali opzioni di pagamento green offrite?",
    answer:
      "Collaboriamo con istituti finanziari ecosostenibili e utilizziamo circuiti di pagamento digitali per ridurre l’impatto ambientale.",
  },
];

export default function SustainabilityFaq() {
  return (
    <section className="mx-auto w-full max-w-2xl py-12">
      <h2 className="text-center text-3xl font-bold text-green-700">
        ❓ Domande sulla nostra Sostenibilità
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
