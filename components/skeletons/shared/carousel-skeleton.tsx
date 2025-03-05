import { Skeleton } from "@/components/ui/skeleton";

const CarouselSkeleton = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative mx-auto w-full overflow-hidden rounded-xl pb-12">
      {/* Contenitore del carosello */}
      {children}
      {/* Pulsanti di navigazione */}
      <button className="absolute left-4 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center rounded-full bg-black/50 p-3 text-white transition hover:bg-black/80">
        <Skeleton className="size-8 animate-pulse rounded-full bg-gray-400" />
      </button>
      <button className="absolute right-4 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center rounded-full bg-black/50 p-3 text-white transition hover:bg-black/80">
        <Skeleton className="size-8 animate-pulse rounded-full bg-gray-400" />
      </button>

      {/* Indicatori */}
      <div className="absolute inset-x-0 bottom-0 flex justify-center pb-4">
        <div className="flex gap-2 rounded-lg bg-white/80 p-2 shadow-md">
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <Skeleton
                key={index}
                className="size-3 animate-pulse rounded-full bg-gray-400"
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default CarouselSkeleton;
