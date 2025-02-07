"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Product } from "@/types";
import CustomProduct from "../shared/product/customProduct";

const CarouselProducts = ({ data }: { data: Product[] }) => {
  // FIXME: cambiare product type(sono simili tra prisma e types)
  return (
    <Carousel
      className="mb-12 w-full"
      opts={{
        loop: true,
        startIndex: 0,
        align: "start",
      }}
    >
      <CarouselContent>
        {data.map((category: Product) => (
          <CarouselItem
            key={category.name}
            className={`md:basis-1/2 lg:basis-1/4`}
          >
            <div className="relative mx-auto h-full">
              {/*  <ProductCard key={category.id} product={category} /> */}
              <CustomProduct
                image="https://utfs.io/f/RnH9VIVP0zpxL8Sd59Kp86NzgPOkKSsma1BjXoZe9tA3HMCW"
                name="Monge Natural Superpremium Adult"
                brand="MONGE"
                rating={5}
                reviews={962}
                availability="Disponibile in 2 varianti"
                price={49.99}
                oldPrice={54.99}
                pricePerKg="€4,16/KG"
              />
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
