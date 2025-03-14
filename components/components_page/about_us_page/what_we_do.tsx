import { Leaf, Package, Truck } from "lucide-react";

const AboutUsWhatWeDo = () => {
  return (
    <div className="grid grid-cols-1 gap-8 py-12 md:grid-cols-3">
      <div className="flex flex-col items-center text-center">
        <Package className="size-12 text-blue-600" />
        <h3 className="mt-4 text-xl font-semibold">Prodotti di Qualità</h3>
        <p className="text-gray-600">
          Selezioniamo solo il meglio per i tuoi animali domestici.
        </p>
      </div>
      <div className="flex flex-col items-center text-center">
        <Truck className="size-12 text-green-600" />
        <h3 className="mt-4 text-xl font-semibold">Spedizione Rapida</h3>
        <p className="text-gray-600">
          Ricevi il tuo ordine in pochi giorni, ovunque tu sia.
        </p>
      </div>
      <div className="flex flex-col items-center text-center">
        <Leaf className="size-12 text-yellow-600" />
        <h3 className="mt-4 text-xl font-semibold">Sostenibilità</h3>
        <p className="text-gray-600">
          Prodotti eco-friendly per il benessere del pianeta.
        </p>
      </div>
    </div>
  );
};

export default AboutUsWhatWeDo;
