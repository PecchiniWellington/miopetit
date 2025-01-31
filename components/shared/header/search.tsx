import DynamicButton from "@/components/dynamic-button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { getProductCategories } from "@/lib/actions/product.actions";
import { SearchIcon } from "lucide-react";

const Search = async () => {
  const categories = await getProductCategories();
  return (
    <form action="/search" method="GET">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Select name="category">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent className="bg-slate-100 dark:bg-slate-800 dark:text-white">
            <SelectItem value="all" key="All">
              All
            </SelectItem>
            {categories.map((x) => (
              <SelectItem value={x.category} key={x.category}>
                {x.category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          name="q"
          type="text"
          placeholder="Search..."
          className="md:w-[100px] lg:w-[300px]"
        />
        <DynamicButton>
          <SearchIcon height={10} width={10} />
        </DynamicButton>
      </div>
    </form>
  );
};

export default Search;
