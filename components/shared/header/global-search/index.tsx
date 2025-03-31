"use client";

import { AnimatePresence, motion } from "framer-motion";
import { SearchIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import BrandButton from "../../brand-components/brand-button";
import BestProduct from "./best-product";
import { useSearch } from "./global-search-context";
import SearchCategorySelect from "./search-categories-select";
import SearchField from "./search-field";
import SuggestedBrand from "./suggested-brand";

const Search = () => {
  const { isDropdownVisible, setIsDropdownVisible, searchRef, searchTerm } =
    useSearch();
  const t = useTranslations("Shared");

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
        <div className="fixed inset-0 z-20 bg-black  transition-opacity"></div>
      )}

      <div ref={searchRef} className="relative z-30  w-full md:max-w-lg">
        <form
          action="/search"
          method="GET"
          className="relative z-30 flex w-full items-center space-x-3 rounded-full bg-white p-2 shadow-md transition-all duration-300 focus-within:ring-2 focus-within:ring-indigo-500"
        >
          <span className="hidden md:block">
            <SearchCategorySelect />
          </span>

          <SearchField />
          <BrandButton disabled={true} type="submit">
            <SearchIcon height={16} width={16} />
          </BrandButton>
        </form>
        <AnimatePresence>
          {isDropdownVisible && (
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              exit={{ scaleY: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "top" }}
              className="fixed inset-x-0  z-10 mx-auto w-full max-w-2xl rounded-xl border border-gray-300 bg-white/80 p-6 pt-14 shadow-xl backdrop-blur-2xl transition-all duration-300 md:absolute md:left-0 md:top-5 md:max-w-lg"
            >
              {searchTerm ? (
                <>
                  <div className="divide-y divide-gray-200">
                    <div className="py-2">
                      <BestProduct />
                    </div>
                    <div className="py-2">
                      <SuggestedBrand />
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-2 p-4 text-gray-600">
                  <svg
                    className="size-12 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M10 2a8 8 0 0 1 6.32 12.9l4.39 4.39a1 1 0 0 1-1.41 1.41l-4.39-4.39A8 8 0 1 1 10 2zm0 2a6 6 0 1 0 3.89 10.6l.32-.32A6 6 0 0 0 10 4z"></path>
                  </svg>
                  <p className="text-sm font-medium text-gray-500">
                    {t("what_are_you_looking_for")}
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Search;
