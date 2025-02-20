import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ICategory } from "@/core/validators";
import { useSearch } from "./global-search-context";

const SearchCategorySelect = ({
  categories,
}: {
  categories: { data: ICategory[] };
}) => {
  const { setSelectedCategory } = useSearch();
  return (
    <Select
      name="category"
      onValueChange={(value) => setSelectedCategory(value)}
    >
      <SelectTrigger className="w-40 rounded-full bg-gray-200 dark:bg-slate-800 dark:text-white">
        <SelectValue placeholder="All" />
      </SelectTrigger>
      <SelectContent className="bg-gray-100 dark:bg-slate-800 dark:text-white">
        <SelectItem value="all" key="All">
          All
        </SelectItem>
        {categories.data.map((x: ICategory) => (
          <SelectItem value={x.slug} key={x.id}>
            {x.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SearchCategorySelect;
