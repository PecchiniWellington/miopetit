import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useSearch } from "./global-search-context";

const BestProduct = () => {
  const { searchResults, searchBrands, setIsDropdownVisible, searchTerm } =
    useSearch();
  const t = useTranslations("Shared");

  return (
    <div className="flex gap-8">
      {/* 🛒 Colonna sinistra - Prodotti */}
      <div className="flex-3 max-h-[300px] overflow-y-auto pr-4">
        <h3 className="mb-4 text-lg font-bold text-gray-900">
          {t("best_results_for")}
          <span className="text-indigo-600">“{searchTerm}”</span>
        </h3>
        <div className="flex flex-col gap-3">
          {searchResults?.slice(0, 6).map((product) => (
            <Link
              href={`/product/${product.slug}`}
              key={product.id}
              className="flex items-center gap-3 rounded-lg p-3 transition hover:bg-gray-100"
              onClick={() => setIsDropdownVisible(false)}
            >
              <Image
                src={product.image?.[0] || "/images/placeholder.jpg"}
                alt={product.name}
                width={50}
                height={50}
                className="rounded-md object-cover"
              />
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-gray-800">
                  {product.name}
                </p>
                <p className="text-md font-bold text-indigo-600">
                  {product.price}€
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 💡 Colonna destra - Brand */}
      <div className="">
        <h3 className="text-md mb-4 font-bold text-gray-900">
          {t("category")}
        </h3>
        <div className="mt-2 flex flex-col gap-2">
          {searchBrands?.length > 0 ? (
            searchBrands?.map((brand, index) => (
              <Link
                key={index}
                href={`/brand/${brand.slug}`}
                onClick={() => setIsDropdownVisible(false)}
                className="text-sm font-medium text-indigo-600 hover:underline"
              >
                {brand.slug}
              </Link>
            ))
          ) : (
            <p className="text-sm text-gray-500">{t("no_category_found")}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BestProduct;
