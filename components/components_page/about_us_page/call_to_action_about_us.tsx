import BrandButton from "@/components/shared/brand-components/brand-button";

const AboutUsCallToAction = () => {
  return (
    <div className="flex flex-col items-center gap-4 bg-gradient-to-r from-indigo-600 to-purple-600 py-16 text-center text-white">
      <div className="flex items-center gap-4">
        <h2 className="text-3xl font-bold">
          Pronto a coccolare il tuo animale?{" "}
        </h2>
        <span className="size-10 rounded-full bg-white p-2">🐾</span>
      </div>
      <p>
        Scopri la nostra selezione di prodotti e rendi felice il tuo amico a
        quattro zampe!
      </p>
      <span>
        <BrandButton variant="danger">Esplora il Negozio</BrandButton>
      </span>
    </div>
  );
};

export default AboutUsCallToAction;
