"use client";

import { debounce } from "@/lib/utils";
import { createContext, useContext, useMemo, useRef, useState } from "react";

interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchResults: {
    id: string;
    slug: string;
    name: string;
    price: string;
    image: string;
  }[];
  searchBrands: {
    id: string;
    name: string;
    slug: string;
    image: string;
  }[];
  setSearchResults: (
    results: {
      id: string;
      slug: string;
      name: string;
      price: string;
      image: string;
    }[]
  ) => void;
  setSearchBrands: (
    brands: {
      id: string;
      name: string;
      slug: string;
      image: string;
    }[]
  ) => void;
  isDropdownVisible: boolean;
  setIsDropdownVisible: (visible: boolean) => void;
  fetchSearchResults: (query: string) => void;
  fetchSearchCategories: () => void;

  searchCategories: { slug: string; id: string }[];

  searchRef: React.RefObject<HTMLDivElement | null>;
  isLoading: boolean;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<
    { id: string; slug: string; name: string; price: string; image: string }[]
  >([]);
  const [searchBrands, setSearchBrands] = useState<
    { id: string; name: string; slug: string; image: string }[]
  >([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchCategories, setSearchCategories] = useState<
    { slug: string; id: string }[]
  >([]);

  const cache = useRef<{
    [key: string]: {
      products: {
        id: string;
        slug: string;
        name: string;
        price: string;
        image: string;
      }[];
      brands: {
        id: string;
        name: string;
        slug: string;
        image: string;
      }[];
    };
  }>({});

  /**
   * ✅ Recupera prodotti e brand, controllando prima la cache
   */

  const fetchSearchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/categories");
      if (!response.ok) {
        throw new Error("Errore nel recupero delle categorie");
      }
      const { data } = await response.json();
      setSearchCategories(data);
    } catch (error) {
      console.error("❌ Errore nel recupero delle categorie:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchSearchResults = useMemo(() => {
    return debounce(async (query: string) => {
      console.log("🔍 Ricerca per", query);
      if (!query) {
        setSearchResults([]);
        setSearchBrands([]);
        setIsDropdownVisible(false);
        return;
      }

      if (cache.current[query]) {
        setSearchResults(
          cache.current[query].products as {
            id: string;
            slug: string;
            name: string;
            price: string;
            image: string;
          }[]
        );
        setSearchBrands(cache.current[query].brands);
        setIsDropdownVisible(true);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(`/api/products/search`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        });
        const { products, brands } = await response.json();

        console.log("🔍 Risultati ricerca per", query, ":", {
          products,
          brands,
        });

        cache.current[query] = { products, brands };
        setSearchResults(products);
        setSearchBrands(brands);
        setIsDropdownVisible(true);
      } catch (error) {
        console.error("Errore durante la ricerca:", error);
        setSearchResults([]);
        setSearchBrands([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);
  }, []);

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        searchResults,
        searchBrands,
        setSearchResults,
        setSearchBrands,
        isDropdownVisible,
        setIsDropdownVisible,
        fetchSearchResults,
        searchCategories,
        fetchSearchCategories,
        searchRef,
        isLoading,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
