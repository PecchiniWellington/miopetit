import BrandButton from "@/components/shared/brand-components/brand-button";

const AboutUsCallToAction = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16 text-center text-white">
      <h2 className="text-3xl font-bold">
        Pronto a coccolare il tuo animale? 🐾
      </h2>
      <p className="mt-4">
        Scopri la nostra selezione di prodotti e rendi felice il tuo amico a
        quattro zampe!
      </p>
      <BrandButton variant="danger">Esplora il Negozio</BrandButton>
    </div>
  );
};

export default AboutUsCallToAction;
