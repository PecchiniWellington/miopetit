import Image from "next/image";
import Link from "next/link";

const SearchResult = (
  searchResults: any[],
  setIsDropdownVisible: (open: boolean) => void
) => {
  return (
    <div className="absolute left-0 z-50 mt-2 w-full rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
      {/* Sezione prodotti più venduti */}
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
              src={product.image}
              alt={product.name}
              width={40}
              height={40}
              className="rounded-md"
            />
            <div>
              <p className="text-sm text-gray-800">{product.name}</p>
              <p className="text-sm font-bold text-gray-600">
                €{product.price}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Sezione ricerche più popolari */}
      <div className="mt-4">
        <h3 className="border-b pb-2 text-sm font-bold text-gray-700">
          📌 PIÙ CERCATI ORA
        </h3>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {[
            "Cibo Per Gatti",
            "Crocchette Per Cani",
            "Monge",
            "Royal Canin",
            "Seresto Collare",
            "Trasportino",
          ].map((term, index) => (
            <Link
              href={`/search?query=${term.toLowerCase()}`}
              key={index}
              className="block rounded-md bg-gray-100 p-2 text-sm text-gray-800 transition hover:bg-gray-200"
              onClick={() => setIsDropdownVisible(false)}
            >
              {term}
            </Link>
          ))}
        </div>
      </div>

      {/* Sezione brand popolari */}
      <div className="mt-4">
        <h3 className="border-b pb-2 text-sm font-bold text-gray-700">
          ⭐ BRAND CONSIGLIATI
        </h3>
        <div className="mt-2 flex gap-3">
          {[
            "/images/brand1.png",
            "/images/brand2.png",
            "/images/brand3.png",
          ].map((brand, index) => (
            <Image
              key={index}
              src={brand}
              alt="Brand"
              width={50}
              height={50}
              className="rounded-md"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
