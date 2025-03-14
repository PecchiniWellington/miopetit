import { Leaf, Package, Recycle } from "lucide-react";

const SustainabilityWhatWeDo = () => {
  return (
    <div className="grid grid-cols-1 gap-8 py-12 md:grid-cols-3">
      <div className="flex flex-col items-center text-center">
        <Leaf className="size-12 text-green-600" />
        <h3 className="mt-4 text-xl font-semibold">Materiali Sostenibili</h3>
        <p className="text-gray-600">
          Utilizziamo solo materiali eco-friendly, biodegradabili e riciclati.
        </p>
      </div>
      <div className="flex flex-col items-center text-center">
        <Package className="size-12 text-yellow-600" />
        <h3 className="mt-4 text-xl font-semibold">Imballaggi Ecologici</h3>
        <p className="text-gray-600">
          Il nostro packaging è compostabile e riduciamo al minimo la plastica.
        </p>
      </div>
      <div className="flex flex-col items-center text-center">
        <Recycle className="size-12 text-blue-600" />
        <h3 className="mt-4 text-xl font-semibold">Economia Circolare</h3>
        <p className="text-gray-600">
          Incentiviamo il riciclo e collaboriamo con fornitori green.
        </p>
      </div>
    </div>
  );
};

export default SustainabilityWhatWeDo;
