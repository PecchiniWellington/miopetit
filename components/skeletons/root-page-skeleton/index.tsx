"use client";
import { Skeleton } from "@/components/ui/skeleton";
import CarouselSkeleton from "../shared/carousel-skeleton";
import CategoriesCardCenter from "../shared/categories-card-center";
import BestSellingProductSkeleton from "./best-selling-skeleton";
import IconBoxesSkeleton from "./icon-boxes-skeleton";
import PresentationDealsSkeleton from "./presentation-deals-skeleton";
import SpecialOfferBrandSkeleton from "./special-offer-brand-skeleton";

const RootPageSkeleton = () => {
  return (
    <div>
      {/* Presentazione Offerte */}
      <PresentationDealsSkeleton />
      {/* Categorie Animali */}
      <div className="mt-2">
        <CarouselSkeleton>
          <CategoriesCardCenter />
        </CarouselSkeleton>
      </div>

      {/* Icone */}
      <div className="my-12">
        <IconBoxesSkeleton />
      </div>

      {/* Banner */}
      <div className="mt-12">
        <Skeleton className="h-64 w-full animate-pulse bg-gradient-to-r from-indigo-500 to-purple-600" />
      </div>

      {/* Offerta Brand */}
      <div className="mt-12">
        <SpecialOfferBrandSkeleton />
      </div>

      {/* Regali */}
      <CategoriesCardCenter num={5} />

      {/* Best Selling Products */}
      <div className="mt-12">
        <BestSellingProductSkeleton />
      </div>
      <div className="mt-12">
        <BestSellingProductSkeleton />
      </div>

      {/* Banner Finale */}
      <div className="mt-12">
        <Skeleton className="h-64 w-full animate-pulse bg-gradient-to-r from-indigo-500 to-purple-600" />
      </div>
    </div>
  );
};

export default RootPageSkeleton;
