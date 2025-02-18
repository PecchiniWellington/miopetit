import { Input } from "@/components/ui/input";

const SearchInput = (
  searchTerm: string,
  setSearchTerm: (e) => void,
  setIsDropdownVisible: (isOpen: boolean) => void
) => {
  return (
    <Input
      name="q"
      type="text"
      placeholder="Search for products..."
      className="w-full rounded-full px-4 py-2 text-gray-700 focus:outline-none focus:ring-0 dark:bg-gray-800 dark:text-white"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      onFocus={() => setIsDropdownVisible(true)}
    />
  );
};

export default SearchInput;
