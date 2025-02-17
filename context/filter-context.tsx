"use client";
import { createContext, ReactNode, useContext, useState } from "react";

// **Tipizzazione del contesto**
interface FilterContextType {
  filters: { [key: string]: any };
  updateFilters: (key: string, value: any) => void;
  resetFilters: () => void;
  isAccordionOpen: boolean;
  setIsAccordionOpen: (isOpen: boolean) => void;
}

// **Creazione del contesto con valore di default**
const FilterContext = createContext<FilterContextType | undefined>(undefined);

// **Provider per il contesto**
export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<{ [key: string]: any }>({});
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const updateFilters = (key: string, value: any) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setIsAccordionOpen(false);
    setFilters({});
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

// **Hook personalizzato per utilizzare il contesto**
export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilterContext must be used within a FilterProvider");
  }
  return context;
};
