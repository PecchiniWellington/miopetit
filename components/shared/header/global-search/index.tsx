"use client";

import { ICategory } from "@/core/validators";
import { AnimatePresence, motion } from "framer-motion";
import { SearchIcon } from "lucide-react";
import { useEffect } from "react";
import BestProduct from "./best-product";
import BestProductSearched from "./best-product-searched";
import { useSearch } from "./global-search-context";
import SearchCategorySelect from "./search-categories-select";
import SearchField from "./search-field";
import SuggestedBrand from "./suggested-brand";

const Search = ({ categories }: { categories: { data: ICategory[] } }) => {
  const { isDropdownVisible, setIsDropdownVisible, searchRef } = useSearch();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsDropdownVisible, searchRef]);

  return (
    <>
      {isDropdownVisible && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-65 transition-opacity"></div>
      )}

      <div
        ref={searchRef}
        className="relative z-50 w-[200px] md:w-full md:max-w-lg"
      >
        <form
          action="/search"
          method="GET"
          className="relative z-30 flex w-full items-center space-x-3 rounded-full bg-white p-2 shadow-md transition-all duration-300 focus-within:ring-2 focus-within:ring-indigo-500"
        >
          <span className="hidden md:block">
            <SearchCategorySelect categories={categories} />
          </span>

          <SearchField />
          <button
            type="submit"
            className="flex items-center justify-center rounded-full bg-indigo-600 p-3 text-white transition-all duration-300 hover:bg-indigo-700"
          >
            <SearchIcon height={16} width={16} />
          </button>
        </form>

        <AnimatePresence>
          {isDropdownVisible && (
            <motion.div
              initial={{ maxHeight: 0, scaleY: 0.8, opacity: 0 }}
              animate={{ maxHeight: 500, scaleY: 1, opacity: 1 }}
              exit={{ maxHeight: 0, scaleY: 0.8, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              className="fixed inset-x-0 top-[90px] z-10 overflow-hidden rounded-lg border border-gray-200 bg-white p-4 pt-14 shadow-lg md:absolute md:left-0 md:top-5 md:max-w-lg md:rounded-md"
            >
              <BestProduct />
              <div className="mt-4">
                <BestProductSearched
                  categories={{ data: categories.data.slice(0, 6) }}
                />
              </div>
              <div className="mt-4">
                <SuggestedBrand />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Search;
