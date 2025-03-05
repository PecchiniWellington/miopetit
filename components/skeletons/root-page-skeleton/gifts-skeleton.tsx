import { Skeleton } from "@/components/ui/skeleton";

const GiftsSkeleton = () => {
  return (
    <div className="my-12">
      {/* Titolo */}
      <Skeleton className="mx-auto mb-6 h-8 w-3/4 animate-pulse bg-gradient-to-r from-indigo-500 to-purple-600" />

      {/* Layout Desktop */}
      <div className="hidden grid-cols-2 justify-center gap-4 rounded-lg sm:grid md:grid-cols-3 lg:grid-cols-5">
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="group relative rounded-3xl bg-white shadow-md"
            >
              <Skeleton className="h-48 w-full animate-pulse rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600" />
            </div>
          ))}
      </div>

      {/* Layout Mobile - Carousel */}
      <div className="relative block w-full md:hidden">
        <div className="flex gap-4 overflow-hidden">
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <Skeleton
                key={index}
                className="h-48 w-1/3 animate-pulse rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600"
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default GiftsSkeleton;
