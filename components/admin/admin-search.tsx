"use client";

import { Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import BrandButton from "../shared/brand-components/brand-button";
import BrandInput from "../shared/brand-components/brand-input";

// **Tipizzazione del contesto**
interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  triggerSearch: () => void;
}

// **Creazione del contesto**
const SearchContext = createContext<SearchContextType | undefined>(undefined);

// **Provider per la ricerca**
export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname(); // ✅ Manteniamo l'intero percorso
  const searchParams = useSearchParams();

  // ✅ Stato per la ricerca
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("query") || ""
  );

  // **Sincronizza l'input con l'URL all'inizio**
  useEffect(() => {
    setSearchQuery(searchParams.get("query") || "");
  }, [searchParams]);

  // ✅ Funzione per avviare la ricerca
  const triggerSearch = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (searchQuery.trim()) {
      params.set("query", searchQuery.trim());
    } else {
      params.delete("query");
    }

    // ✅ Aggiorna l'URL senza ricaricare la pagina
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <SearchContext.Provider
      value={{ searchQuery, setSearchQuery, triggerSearch }}
    >
      {children}
    </SearchContext.Provider>
  );
};

// **Hook personalizzato per usare il contesto**
export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
};

// **Componente di ricerca**
const AdminSearch = () => {
  const { searchQuery, setSearchQuery, triggerSearch } = useSearchContext();

  // Invio con il tasto "Enter"
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      triggerSearch();
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    triggerSearch();
  };

  return (
    <div className="relative flex w-full items-center gap-2">
      {/* Input di ricerca */}
      <BrandInput
        variant="admin"
        type="text"
        placeholder="Cerca prodotti..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown} // Invio con "Enter"
        className="w-full rounded-lg border bg-gray-700 p-2 px-10 text-white outline-none placeholder:text-gray-400 focus:ring focus:ring-purple-300"
      />

      {searchQuery && (
        <BrandButton
          onClick={() => clearSearch()}
          variant="danger"
          size="small"
        >
          <X size={18} />
        </BrandButton>
      )}
      {/* Bottone di ricerca */}
      <BrandButton
        onClick={() => triggerSearch()} // Cliccando l'icona avvia la ricerca
        variant="flat"
      >
        <Search size={18} />
      </BrandButton>
    </div>
  );
};

export default AdminSearch;
