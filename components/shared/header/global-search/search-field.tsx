import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useSearch } from "./global-search-context";

const SearchField = () => {
  const {
    searchTerm,
    setSearchTerm,
    setIsDropdownVisible,
    fetchSearchResults,
    setSearchResults,
  } = useSearch();

  return (
    <div className="relative w-full">
      <Input
        autoComplete="off"
        name="q"
        type="text"
        placeholder="Cerca tra oltre 10.000 prodotti..."
        className="w-full rounded-full px-4 py-2 text-gray-700 focus:outline-none focus:ring-0 dark:bg-gray-800 dark:text-white"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          fetchSearchResults(e.target.value);
        }}
        onFocus={() => setIsDropdownVisible(true)}
      />
      {searchTerm && (
        <X
          className="absolute right-3 top-2 size-5 cursor-pointer text-gray-500"
          onClick={() => {
            setSearchTerm("");
            setSearchResults([]);
            setIsDropdownVisible(false);
          }}
        />
      )}
    </div>
  );
};

export default SearchField;
