"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import AnimalAvatar from "../animal-avatar";

const CarouselIndispensable = ({
  indispensables,
  animalCategory,
}: {
  indispensables: { image: string; href: string; label: string }[];
  animalCategory: string;
}) => {
  return (
    <div className="relative  w-full">
      <h2 className="mb-6 text-center text-3xl font-bold text-gray-900 dark:text-white">
        Indispensabile per il tuo{" "}
        {animalCategory.charAt(0).toUpperCase() + animalCategory.slice(1)} 🐾
      </h2>
      <Carousel
        className="w-full"
        opts={{
          loop: true,
          startIndex: 0,
          align: "start",
        }}
      >
        <CarouselContent>
          {indispensables.map(
            ({
              label,
              image,
              href,
            }: {
              image: string;
              href: string;
              label: string;
            }) => (
              <CarouselItem
                key={label}
                className={`basis-1/2 md:basis-1/3 lg:basis-2/12`}
              >
                <Link href={`/${href}`}>
                  <div className="relative mx-auto h-full ">
                    <AnimalAvatar image={image} name={label} />
                  </div>
                </Link>
              </CarouselItem>
            )
          )}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2" />
        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2" />
      </Carousel>
    </div>
  );
};

export default CarouselIndispensable;
