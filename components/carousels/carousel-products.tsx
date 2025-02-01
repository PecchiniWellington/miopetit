"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Product } from "@/types";
import React from "react";
import ProductCard from "../shared/product/product-card";

const CarouselProducts = ({ data }: { data: Product[] }) => {
  // FIXME: cambiare product type(sono simili tra prisma e types)
  return (
    <Carousel
      className="w-full mb-12"
      opts={{
        loop: true,
        startIndex: 0,
        align: "start",
      }}
    >
      <CarouselContent>
        {data.map((category: any) => (
          <CarouselItem
            key={category.name}
            className={`md:basis-1/2 lg:basis-1/4`}
          >
            <div className="relative mx-auto h-full">
              <ProductCard key={category.id} product={category} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CarouselProducts;
