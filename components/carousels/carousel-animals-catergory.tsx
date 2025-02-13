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

const animals = [
  {
    name: "dog",
    image: "dog.png",
    href: "/dog",
  },
  {
    name: "cat",
    image: "cat.png",
    href: "/cat",
  },
  {
    name: "small animals",
    image: "small-animals.png",
    href: "/small-animals",
  },
  {
    name: "fish",
    image: "fish.png",
    href: "/fish",
  },
  {
    name: "bird",
    image: "bird.png",
    href: "/bird",
  },
  {
    name: "reptiles",
    image: "reptiles.png",
    href: "/reptiles",
  },
];

const CarouselAnimalsCategory = () => {
  return (
    <div className="relative mb-12 w-full">
      <h2 className="mb-6 text-center text-3xl font-bold text-gray-900 dark:text-white">
        Per chi stai comprando? 🐾
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
          {animals.map(({ name, image }) => (
            <CarouselItem
              key={name}
              className={`basis-1/2 md:basis-1/3 lg:basis-1/5`}
            >
              <Link href={`/${name}`}>
                <div className="relative mx-auto h-full ">
                  <AnimalAvatar image={image} name={name} />
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

export default CarouselAnimalsCategory;
