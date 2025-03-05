import { Skeleton } from "@/components/ui/skeleton";
import CarouselSkeleton from "../shared/carousel-skeleton";
import CustomProductSkeleton from "../shared/custom-product-skeleton";

const SpecialOfferBrandSkeleton = () => {
  return (
    <div className="relative grid grid-cols-1 gap-10 rounded-xl bg-gray-100 p-6 shadow-lg md:my-12 md:grid-cols-4 md:p-12">
      {/* Sezione Informativa */}
      <div className="col-span-3 flex w-full flex-col gap-5 md:col-span-1 md:p-6">
        <Skeleton className="h-8 w-3/4 animate-pulse bg-gradient-to-r from-indigo-500 to-purple-600" />
        <Skeleton className="h-48 w-full animate-pulse rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600" />
        <Skeleton className="h-6 w-1/2 animate-pulse bg-gradient-to-r from-indigo-500 to-purple-600" />
        <Skeleton className="h-4 w-full animate-pulse bg-gradient-to-r from-indigo-500 to-purple-600" />
        <Skeleton className="h-4 w-3/4 animate-pulse bg-gradient-to-r from-indigo-500 to-purple-600" />
      </div>

      {/* Sezione Prodotti in Offerta */}
      <div className="relative col-span-3 overflow-hidden">
        <CarouselSkeleton>
          <div className="flex gap-4 overflow-hidden">
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <CustomProductSkeleton key={index} />
              ))}
          </div>
        </CarouselSkeleton>
      </div>
    </div>
  );
};

export default SpecialOfferBrandSkeleton;
