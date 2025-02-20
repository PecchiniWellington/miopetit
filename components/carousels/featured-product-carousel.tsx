"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ILatestProduct } from "@/core/validators";
import AutoPlay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";

const ProductCarousel = ({ data }: { data: ILatestProduct[] }) => {
  // FIXME: cambiare product type(sono simili tra prisma e types)
  return (
    <Carousel
      className="mb-12 w-full"
      opts={{
        loop: true,
      }}
      plugins={[
        AutoPlay({
          delay: 6000,
          stopOnInteraction: true,
        }),
      ]}
    >
      <CarouselContent>
        {data.map((product: ILatestProduct) => (
          <CarouselItem key={product.id}>
            <Link href={`/product/${product.slug}`}>
              <div className="relative mx-auto h-full max-h-[300px]">
                <Image
                  src={product.banner! || "/images/placeholder.jpg"}
                  alt={product.name}
                  height="0"
                  width="0"
                  sizes="100vw"
                  className="size-full object-cover object-center"
                />
                <div className="absolute inset-0 flex items-end justify-center">
                  <h2 className="bg-gray-900/50 px-2 text-2xl font-bold text-white">
                    {product.name}
                  </h2>
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default ProductCarousel;
