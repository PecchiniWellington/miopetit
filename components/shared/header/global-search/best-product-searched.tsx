import { ICategory } from "@/core/validators";
import Link from "next/link";
import { useSearch } from "./global-search-context";

const BestProductSearched = ({
  categories,
}: {
  categories: { data: ICategory[] };
}) => {
  const { setIsDropdownVisible } = useSearch();
  return (
    <>
      <h3 className="border-b pb-2 text-sm font-bold text-gray-700">
        📌 PIÙ CERCATI ORA
      </h3>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {categories.data.map((term, index) => (
          <Link
            href={`/${term.slug}`}
            key={index}
            className="block rounded-md bg-gray-100 p-2 text-sm text-gray-800 transition hover:bg-gray-200"
            onClick={() => setIsDropdownVisible(false)}
          >
            {term.name}
          </Link>
        ))}
      </div>
    </>
  );
};

export default BestProductSearched;
