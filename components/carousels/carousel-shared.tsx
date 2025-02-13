"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";

const CarouselIndispensable = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="relative w-full">
      <h2 className="mb-6 text-center text-3xl font-bold text-gray-900 dark:text-white">
        {title}
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
          {Array.from({ length: 16 }).map((_, index) => (
            <CarouselItem
              key={index}
              className={`basis-1/2 md:basis-1/3 lg:basis-2/12`}
            >
              <Link href={`/ciao`}>
                <div className="relative mx-auto h-full ">{children}</div>
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

export default CarouselIndispensable;
