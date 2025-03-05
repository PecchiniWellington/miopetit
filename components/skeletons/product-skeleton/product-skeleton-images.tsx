import { Skeleton } from "@/components/ui/skeleton";

const ProductCarouselSkeleton = () => {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      {/* Contenitore fisso per evitare resizing */}
      <div className="relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-lg shadow-md">
        <Skeleton className="absolute size-full animate-pulse rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600" />

        {/* Pulsanti di navigazione */}

        <Skeleton className="absolute left-2 top-1/2 size-10 -translate-y-1/2 animate-pulse rounded-full bg-gradient-to-r from-indigo-500 to-purple-600" />
        <Skeleton className="absolute right-2 top-1/2 size-10 -translate-y-1/2 animate-pulse rounded-full bg-gradient-to-r from-indigo-500 to-purple-600" />
      </div>

      {/* Miniature */}
      <div className="mt-4 flex justify-center gap-2">
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <Skeleton
              key={index}
              className="size-16 animate-pulse rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600"
            />
          ))}
      </div>
    </div>
  );
};

export default ProductCarouselSkeleton;
