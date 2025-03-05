import { Skeleton } from "@/components/ui/skeleton";
import CarouselSkeleton from "../shared/carousel-skeleton";
import CategoriesCardCenter from "../shared/categories-card-center";
import CustomProductSkeleton from "../shared/custom-product-skeleton";

const BestSellingProductSkeleton = () => {
  return (
    <section className="my-12 rounded-lg border border-gray-200 bg-white p-8 shadow-md">
      {/* Titolo */}
      <Skeleton className="mx-auto h-8 w-1/3 animate-pulse bg-gradient-to-r from-indigo-500 to-purple-600" />
      <Skeleton className="mx-auto mt-3 h-1 w-20 animate-pulse rounded-full bg-primary-500" />

      {/* Carousel Brands */}
      <div className="mt-6 flex gap-4 overflow-hidden">
        <CarouselSkeleton>
          <CategoriesCardCenter num={3} border={false} />
        </CarouselSkeleton>
      </div>

      {/* Contenitore prodotti */}
      <div className="mt-8 rounded-lg shadow-sm md:border md:border-gray-100 md:bg-gray-50 md:p-6">
        {/* Mobile: Carousel */}
        <div className="block md:hidden">
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

        {/* Desktop: Lista prodotti */}
        <div className="hidden md:block">
          <Skeleton className="mx-auto mb-4 h-6 w-1/3 animate-pulse bg-gradient-to-r from-indigo-500 to-purple-600" />
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {Array(8)
              .fill(0)
              .map((_, index) => (
                <CustomProductSkeleton key={index} />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestSellingProductSkeleton;
