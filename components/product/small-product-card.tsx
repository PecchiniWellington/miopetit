import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import BrandButton from "../shared/brand-components/brand-button";

const SmallProductCard = () => {
  return (
    <div className="w-46 rounded-2xl border border-gray-200 bg-white p-4 shadow-md transition hover:shadow-lg">
      {/* Immagine prodotto */}
      <div className="relative flex justify-center p-4">
        <Image
          src="/images/royal-canin-4.jpg" // Cambia con il path corretto
          alt="Virtus Protein Selection Dog Latta 400G"
          width={120}
          height={120}
          className="object-contain"
        />
      </div>

      {/* Info Prodotto */}
      <div className="border-t border-gray-100 pt-3">
        <h2 className="text-md font-extrabold uppercase tracking-wide">
          VIRTUS
        </h2>
        <p className="text-sm text-gray-600">
          Virtus Protein Selection Dog Lattina 400G
        </p>

        {/* Prezzi */}
        <div className="mt-2 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 line-through">€3,19</span>
            <span className="text-lg font-bold text-red-600">€3,19</span>
          </div>
          <div className="flex justify-end">
            <BrandButton>
              <ShoppingCart size={20} />
            </BrandButton>
          </div>
        </div>

        {/* Pulsante Carrello */}
      </div>
    </div>
  );
};

export default SmallProductCard;
