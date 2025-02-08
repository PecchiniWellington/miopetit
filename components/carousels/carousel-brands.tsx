"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Image from "next/image";
import Link from "next/link";

const brands = [
  {
    name: "brand1",
    image: "brand-1.avif",
    href: "/brand1",
  },
  {
    name: "brand2",
    image: "brand-2.avif",
    href: "/brand2",
  },
  {
    name: "brand3",
    image: "brand-3.avif",
    href: "/brand3",
  },
  {
    name: "brand4",
    image: "brand-4.avif",
    href: "/brand4",
  },
  {
    name: "brand5",
    image: "brand-5.avif",
    href: "/brand5",
  },
  {
    name: "brand6",
    image: "brand-6.avif",
    href: "/brand6",
  },
  {
    name: "brand7",
    image: "brand-7.avif",
    href: "/brand7",
  },
];

const CarouselBrands = () => {
  // FIXME: cambiare product type(sono simili tra prisma e types)
  return (
    <div className="relative mb-12 w-full">
      <Carousel
        className="w-full"
        opts={{
          loop: true,
          startIndex: 0,
          align: "start",
        }}
      >
        <CarouselContent>
          {brands.map(({ name, image }) => (
            <CarouselItem
              key={name} /* className={`md:basis-1/2 lg:basis-1/4`} */
            >
              <Link href={`/category/${name}`}>
                <div className="relative mx-auto h-full">
                  <Image
                    src={`/images/${image}`}
                    alt={name}
                    height="0"
                    width="0"
                    sizes="100vw"
                    className="size-full object-cover object-center"
                  />
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2" />
        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2" />
      </Carousel>
    </div>
  );
};

export default CarouselBrands;
