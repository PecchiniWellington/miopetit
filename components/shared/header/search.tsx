import DynamicButton from "@/components/dynamic-button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllCategories } from "@/core/actions/products/product-infos.ts/get-product-category.action";
import { ICategory } from "@/core/validators";
import { SearchIcon } from "lucide-react";

const Search = async () => {
  const categories = await getAllCategories();

  return (
    <form
      action="/search"
      method="GET"
      className="flex w-full max-w-lg items-center space-x-3 rounded-full bg-white p-2 shadow-md transition-all duration-300 focus-within:ring-2 focus-within:ring-indigo-500"
    >
      {/* Dropdown delle categorie */}
      <Select name="category">
        <SelectTrigger className="w-40 rounded-full bg-gray-200 dark:bg-slate-800 dark:text-white">
          <SelectValue placeholder="All" />
        </SelectTrigger>
        <SelectContent className="bg-gray-100 dark:bg-slate-800 dark:text-white">
          <SelectItem value="all" key="All">
            All
          </SelectItem>
          {categories.data?.map((x: ICategory) => (
            <SelectItem value={x.id} key={x.id}>
              {x.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Campo di ricerca */}
      <Input
        name="q"
        type="text"
        placeholder="Search for products..."
        className="w-full rounded-full px-4 py-2 text-gray-700 focus:outline-none focus:ring-0 dark:bg-gray-800 dark:text-white"
      />

      {/* Pulsante di ricerca */}
      <DynamicButton className="flex items-center justify-center rounded-full bg-indigo-600 p-3 text-white transition-all duration-300 hover:bg-indigo-700">
        <SearchIcon height={16} width={16} />
      </DynamicButton>
    </form>
  );
};

export default Search;
