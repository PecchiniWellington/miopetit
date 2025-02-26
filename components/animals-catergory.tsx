"use client";

import Link from "next/link";
import AnimalAvatar from "./animal-avatar";
import DynamicCarousel from "./carousels/carousel";

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

const AnimalCategory = () => {
  return (
    <div className="relative mb-12 w-full">
      <h2 className="mb-6 text-center text-3xl font-bold text-gray-900 dark:text-white">
        Per chi stai comprando? 🐾
      </h2>
      <DynamicCarousel
        data={animals}
        itemsPerView={4}
        gap={20}
        renderItem={({ name, image }) => (
          <Link href={`/${name}`}>
            <div className="relative mx-auto h-full ">
              <AnimalAvatar image={image} name={name} />
            </div>
          </Link>
        )}
      />
    </div>
  );
};

export default AnimalCategory;
