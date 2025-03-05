import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const CustomProductSkeleton = () => {
  return (
    <Card className="relative z-10 w-full  overflow-hidden rounded-xl border bg-white p-4 shadow-md transition hover:shadow-lg">
      <div className="relative flex items-center justify-center rounded-lg bg-gray-100 p-6">
        <Skeleton className="size-40 animate-pulse rounded-md bg-gradient-to-r from-indigo-500 to-purple-600" />
        <Skeleton className="absolute right-3 top-3 size-9 animate-pulse rounded-full bg-gray-300" />
      </div>

      <div className="mt-4 space-y-2">
        <Skeleton className="h-4 w-3/4 animate-pulse bg-gradient-to-r from-indigo-500 to-purple-600" />
        <Skeleton className="h-3 w-1/2 animate-pulse bg-gradient-to-r from-indigo-500 to-purple-600" />

        <Skeleton className="h-4 w-24 animate-pulse bg-yellow-500" />
        <Skeleton className="h-3 w-32 animate-pulse bg-gray-400" />

        <div className="flex items-center space-x-2">
          <Skeleton className="h-4 w-12 animate-pulse bg-red-500" />
          <Skeleton className="h-5 w-20 animate-pulse bg-gray-400" />
        </div>
      </div>

      <Skeleton className="absolute bottom-4 right-4 size-12 animate-pulse rounded-full bg-black" />
    </Card>
  );
};

export default CustomProductSkeleton;
