import { Skeleton } from "@/components/ui/skeleton";

const PresentationDealsSkeleton = () => {
  return (
    <section className="mx-auto px-4 py-12">
      <div className="mt-6 grid min-h-56 grid-cols-2 gap-10 sm:grid-cols-3 md:grid-cols-4">
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="relative flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-orange-400 via-pink-500 to-purple-500 p-1 shadow-md"
            >
              <Skeleton className="relative flex size-full max-w-[140px] items-center justify-center rounded-lg bg-white p-4 sm:max-w-[180px] sm:p-6 md:max-w-[200px] lg:max-w-[300px]" />
            </div>
          ))}
      </div>
    </section>
  );
};

export default PresentationDealsSkeleton;
