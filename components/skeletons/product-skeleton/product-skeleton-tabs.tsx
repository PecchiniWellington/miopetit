import { Skeleton } from "@/components/ui/skeleton";

const ProductTabsSkeleton = () => {
  return (
    <div className="mt-10 w-full rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
      {/* Tab Navigation */}
      <div className="relative flex items-center gap-3 border-b dark:border-gray-700">
        <Skeleton className="h-10 w-1/2 animate-pulse rounded-md bg-gradient-to-r from-indigo-500 to-purple-600" />
        <Skeleton className="h-10 w-1/2 animate-pulse rounded-md bg-gradient-to-r from-indigo-500 to-purple-600" />
      </div>

      {/* Tab Content */}
      <div className="relative mt-6 min-h-[250px]">
        <Skeleton className="h-6 w-3/4 animate-pulse rounded-md bg-gradient-to-r from-indigo-500 to-purple-600" />
        <Skeleton className="mt-4 h-4 w-1/2 animate-pulse rounded-md bg-gradient-to-r from-indigo-500 to-purple-600" />
        <Skeleton className="mt-4 h-32 w-full animate-pulse rounded-md bg-gradient-to-r from-indigo-500 to-purple-600" />
      </div>
    </div>
  );
};

export default ProductTabsSkeleton;
