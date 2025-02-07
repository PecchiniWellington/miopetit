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
import { ICategory } from "@/core/types";
import { SearchIcon } from "lucide-react";

const Search = async () => {
  const categories = await getAllCategories();
  return (
    <form action="/search" method="GET">
      <div className="flex w-full max-w-sm items-center space-x-2 ">
        <Select name="category">
          <SelectTrigger className="w-[180px] bg-white dark:bg-slate-800 dark:text-white">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent className="bg-slate-100 dark:bg-slate-800 dark:text-white">
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
