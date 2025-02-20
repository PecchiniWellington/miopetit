"use client";

import { debounce } from "@/lib/utils";
import { createContext, useContext, useRef, useState } from "react";

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
  setSearchResults: (
    results: {
      id: string;
      slug: string;
      name: string;
      price: string;
      image: string;
    }[]
  ) => void;
  isDropdownVisible: boolean;
  setIsDropdownVisible: (visible: boolean) => void;
  fetchSearchResults: (query: string) => void;
  selectCategory: string;
  setSelectedCategory: (category: string) => void;
  searchRef: React.RefObject<HTMLDivElement | null>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectCategory, setSelectedCategory] = useState("all");
  const [searchResults, setSearchResults] = useState<
    { id: string; slug: string; name: string; price: string; image: string }[]
  >([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Simulazione ricerca con debounce
  const fetchSearchResults = debounce((query: string) => {
    if (!query) {
      setSearchResults([]);
      setIsDropdownVisible(false);
      return;
    }

    setTimeout(() => {
      setSearchResults([
        {
          id: "1",
          slug: "kit-risparmio-felix",
          name: "Kit Risparmio Felix",
          price: "€54.90",
          image: "/images/product1.png",
        },
        {
          id: "2",
          slug: "felix-ghiottonerie",
          name: "Felix Le Ghiottonerie Multipack",
          price: "€33.99",
          image: "/images/product2.png",
        },
        {
          id: "3",
          slug: "next-natural-cat",
          name: "Next Natural Cat Multipack",
          price: "€7.96",
          image: "/images/product3.png",
        },
      ]);
      setIsDropdownVisible(true);
    }, 300);
  }, 300);

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        searchResults,
        setSearchResults,
        isDropdownVisible,
        setIsDropdownVisible,
        fetchSearchResults,
        setSelectedCategory,
        selectCategory,
        searchRef, // 🔥 Passiamo il `searchRef` al context
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
