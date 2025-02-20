"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSearch } from "./global-search-context";

const SearchCategorySelect = () => {
  const router = useRouter();
  const { searchCategories, isLoading, fetchSearchCategories } = useSearch();

  return (
    <Select
      name="category"
      onValueChange={(value) => {
        router.push(`/${value}`);
      }}
      onOpenChange={(isOpen) => {
        if (isOpen) {
          fetchSearchCategories();
        }
      }}
      disabled={isLoading}
    >
      <SelectTrigger className="w-44 rounded-full bg-gray-200 px-4 py-2 text-gray-700 shadow-md transition-all duration-300 hover:bg-gray-300 focus:ring-2 focus:ring-indigo-500 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700">
        <SelectValue placeholder={isLoading ? "Loading..." : "All"} />
      </SelectTrigger>
      <SelectContent className="bg-gray-100 dark:bg-slate-800 dark:text-white">
        {isLoading ? (
          <div className="flex items-center justify-center p-4">
            <Loader className="size-6 animate-spin text-indigo-600" />
          </div>
        ) : (
          searchCategories.map((x) => (
            <SelectItem
              value={x.slug}
              key={x.id}
              className="rounded-md transition-all duration-200 hover:bg-indigo-100 dark:hover:bg-indigo-900"
            >
              {x.name}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
};

export default SearchCategorySelect;
