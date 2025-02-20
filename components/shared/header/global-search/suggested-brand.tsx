import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearch } from "./global-search-context";

const SuggestedBrand = () => {
  const { searchBrands, isLoading, setIsDropdownVisible } = useSearch();
  console.log("searchBrands", searchBrands);

  return (
    <div>
      <h3 className="border-b pb-2 text-sm font-bold text-gray-700">
        ⭐ BRAND
      </h3>
      <div className="mt-2 flex gap-3">
        {!isLoading ? (
          searchBrands?.slice(0, 4).map((brand, index) => (
            <Link
              key={index}
              href={`/brand/${brand.slug}`}
              onClick={() => setIsDropdownVisible(false)}
            >
              <Image
                src={brand?.image || "/images/placeholder.jpg"}
                alt={brand.name}
                width={50}
                height={50}
                className="rounded-md"
              />
            </Link>
          ))
        ) : (
          <div className="mt-2 flex gap-3">
            <Loader className="size-6 animate-spin text-indigo-600" />
            <Loader className="size-6 animate-spin text-indigo-600" />
            <Loader className="size-6 animate-spin text-indigo-600" />
            <Loader className="size-6 animate-spin text-indigo-600" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SuggestedBrand;
