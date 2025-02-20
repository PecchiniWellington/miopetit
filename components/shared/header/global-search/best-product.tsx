import Image from "next/image";

import Link from "next/link";
import { useSearch } from "./global-search-context";

const BestProduct = () => {
  const { searchResults, setIsDropdownVisible } = useSearch();
  return (
    <div className="mb-2">
      <h3 className="border-b pb-2 text-sm font-bold text-gray-700">
        🔥 PRODOTTI PIÙ VENDUTI
      </h3>
      {searchResults.slice(0, 5).map((product) => (
        <Link
          href={`/product/${product.slug}`}
          key={product.id}
          className="flex items-center gap-3 p-2 transition hover:bg-gray-100"
          onClick={() => setIsDropdownVisible(false)}
        >
          <Image
            src={product.image[0] || "/images/placeholder.jpg"}
            alt={product.name}
            width={40}
            height={40}
            className="rounded-md"
          />
          <div>
            <p className="text-sm text-gray-800">{product.name}</p>
            <p className="text-sm font-bold text-gray-600">{product.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BestProduct;
