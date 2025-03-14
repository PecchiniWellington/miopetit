import { Check } from "lucide-react";
import Image from "next/image";

const AboutUsWhyUs = () => {
  return (
    <div className="bg-gray-100 py-16">
      <div className="flex flex-col items-center justify-around md:flex-row">
        <div className="max-w-lg">
          <h2 className="text-3xl font-bold">Cosa ci rende unici? 🏆</h2>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li className="flex items-center">
              <Check className="mr-2 size-6 text-green-500" /> Prodotti testati
              e certificati
            </li>
            <li className="flex items-center">
              <Check className="mr-2 size-6 text-green-500" /> Spedizioni veloci
              in tutta Italia
            </li>
            <li className="flex items-center">
              <Check className="mr-2 size-6 text-green-500" /> Prezzi
              competitivi e offerte esclusive
            </li>
            <li className="flex items-center">
              <Check className="mr-2 size-6 text-green-500" /> Un customer
              service sempre disponibile
            </li>
          </ul>
        </div>
        <Image
          height={400}
          width={400}
          src="/assets/mio_petit_pets.jpg"
          alt="Animali felici"
          className="w-1/2 rounded-xl shadow-lg"
        />
      </div>
    </div>
  );
};

export default AboutUsWhyUs;
