import { Skeleton } from "@/components/ui/skeleton";

const CategoriesCardCenter = ({
  num = 4,
  border,
}: {
  num?: number;
  border?: boolean;
}) => {
  return (
    <div className="relative mb-12 w-full">
      <Skeleton className="mx-auto mb-6 h-8 w-1/3 animate-pulse bg-gradient-to-r from-indigo-500 to-purple-600" />
      <div className="flex items-center justify-between gap-4">
        {Array(num)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className={`flex size-72 flex-col items-center rounded-lg ${border ? "border border-gray-300 shadow-md" : ""} p-4 `}
            >
              <Skeleton className="size-48 animate-pulse rounded-full bg-gradient-to-r from-indigo-500 to-purple-600" />
              <Skeleton className="mt-2 h-4 w-20 animate-pulse bg-gradient-to-r from-indigo-500 to-purple-600" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default CategoriesCardCenter;
