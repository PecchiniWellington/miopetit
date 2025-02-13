"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { ILatestProduct } from "@/core/validators";
import CustomProduct from "../shared/product/customProduct";

const CarouselProducts = ({ data }: { data: ILatestProduct[] }) => {
  // FIXME: cambiare product type(sono simili tra prisma e types)
  return (
    <div className="relative mb-12 w-full ">
      <Carousel
        className="mb-12 w-full"
        opts={{
          loop: true,
          startIndex: 0,
          align: "start",
        }}
      >
        <CarouselContent>
          {data.map((category: ILatestProduct) => (
            <CarouselItem
              key={category.name}
              className={` md:basis-1/2 lg:basis-1/4`}
            >
              <div className="relative mx-auto h-full  md:py-4">
                <CustomProduct
                  image="https://utfs.io/f/RnH9VIVP0zpxL8Sd59Kp86NzgPOkKSsma1BjXoZe9tA3HMCW"
                  name="Monge Natural Superpremium Adult"
                  productBrand="MONGE"
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
        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2" />
        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2" />
      </Carousel>
    </div>
  );
};

export default CarouselProducts;
