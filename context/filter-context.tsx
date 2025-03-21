"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface FilterContextType {
  filters: { [key: string]: string };
  updateFilters: (key: string, value: string) => void;
  resetFilters: () => void;
  isAccordionOpen: boolean;
  setIsAccordionOpen: (isOpen: boolean) => void;
}

// **Creazione del contesto**
const FilterContext = createContext<FilterContextType | undefined>(undefined);

// **Provider per il contesto**
export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // ✅ Manteniamo l'intero percorso
  const searchParams = useSearchParams();

  useEffect(() => {
    if (Object.keys(filters).length === 0) return; // Evita esecuzioni inutili

    const params = new URLSearchParams(searchParams.toString());

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== "all") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    const newUrl = `${pathname}?${params.toString()}`;

    if (newUrl !== window.location.pathname + window.location.search) {
      router.replace(newUrl, { scroll: false });
    }
  }, [filters, router, pathname, searchParams]);

  const updateFilters = (key: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({});
    setIsAccordionOpen(false);

    router.replace(pathname, { scroll: false });
  };

  return (
    <FilterContext.Provider
      value={{
        filters,
        updateFilters,
        resetFilters,
        isAccordionOpen,
        setIsAccordionOpen,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

// **Hook personalizzato per usare il contesto**
export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilterContext must be used within a FilterProvider");
  }
  return context;
};
