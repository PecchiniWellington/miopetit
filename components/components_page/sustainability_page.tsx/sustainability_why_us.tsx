import { Check } from "lucide-react";
import Image from "next/image";

const SustainabilityWhyUs = () => {
  return (
    <div className="bg-gray-100 py-16">
      <div className="flex flex-col items-center justify-around md:flex-row">
        <div className="max-w-lg">
          <h2 className="text-3xl font-bold text-green-700">
            Perché Siamo Davvero Green? 🌍
          </h2>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li className="flex items-center">
              <Check className="mr-2 size-6 text-green-500" /> Fornitori
              certificati eco-friendly
            </li>
            <li className="flex items-center">
              <Check className="mr-2 size-6 text-green-500" /> Zero plastica
              negli imballaggi
            </li>
            <li className="flex items-center">
              <Check className="mr-2 size-6 text-green-500" /> Spedizioni a
              impatto zero
            </li>
            <li className="flex items-center">
              <Check className="mr-2 size-6 text-green-500" /> Collaborazioni
              con ONG ambientali
            </li>
          </ul>
        </div>
        <Image
          height={400}
          width={400}
          src="/assets/sustainability/green.jpg"
          alt="Sostenibilità"
          className="w-1/2 rounded-xl shadow-lg"
        />
      </div>
    </div>
  );
};

export default SustainabilityWhyUs;
