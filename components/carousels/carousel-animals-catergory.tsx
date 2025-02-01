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
        {animals.map((category: any) => (
          <CarouselItem
            key={category.name}
            className={`md:basis-1/2 lg:basis-1/5`}
          >
            <Link href={`/category/${category.name}`}>
              <div className="relative mx-auto h-full">
                <AnimalAvatar image={category.image} name={category.name} />
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

export default CarouselAnimalsCategory;
