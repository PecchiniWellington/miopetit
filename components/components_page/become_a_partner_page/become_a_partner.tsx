import AccordionFaq2 from "../about_us_page/accordiont_test";

const faqs = [
  {
    question: "💰 Quanto sono le commissioni?",
    answer:
      "Le nostre commissioni sono tra le più basse del settore, permettendoti di guadagnare di più su ogni vendita.",
  },
  {
    question: "📢 Quali campagne marketing offrite ai partner?",
    answer:
      "Ogni partner riceve promozione personalizzata sui nostri canali social e nelle campagne pubblicitarie.",
  },
  {
    question: "🛍️ Devo creare un sito web separato?",
    answer:
      "No! Ti forniamo uno spazio online pronto all’uso con costi minimi e tutto incluso.",
  },
  {
    question: "📦 Chi si occupa delle spedizioni?",
    answer:
      "Puoi scegliere di gestire autonomamente le spedizioni o affidarti al nostro network di logistica eco-friendly.",
  },
];

export default function BecomePartnerFaq() {
  return (
    <section className="mx-auto w-full max-w-2xl py-12">
      <h2 className="text-center text-3xl font-bold text-blue-700">
        ❓ Domande Frequenti sui Partner
      </h2>
      <div className="mt-6 space-y-4">
        {faqs.map((faq, index) => (
          <AccordionFaq2
            key={index}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
      </div>
    </section>
  );
}
