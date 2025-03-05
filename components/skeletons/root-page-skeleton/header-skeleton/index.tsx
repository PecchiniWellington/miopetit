import { Skeleton } from "@/components/ui/skeleton";
import GlobalSearchSkeleton from "../../shared/global-search-skeleton";
import CategoryNavSkeleton from "./category-nav-skeleton";
import TopBarSkeleton from "./top-bar-skeleton";

const HeaderSkeleton = () => {
  return (
    <>
      <TopBarSkeleton />
      <div className="flex w-full animate-pulse items-center justify-between bg-gradient-to-r from-indigo-500 to-purple-600 p-4">
        {/* Logo */}
        <span className="wrapper flex  items-center justify-between space-x-4">
          <Skeleton className="size-10 rounded-full bg-gray-300" />

          {/* Search Bar */}
          <div className="flex items-center space-x-2">
            <GlobalSearchSkeleton />
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Skeleton className="size-10 rounded-full bg-gray-300" />
            <Skeleton className="size-10 rounded-full bg-gray-300" />
            <Skeleton className="size-10 rounded-full bg-gray-300" />
          </div>
        </span>
      </div>
      <CategoryNavSkeleton num={3} />
    </>
  );
};

export default HeaderSkeleton;
