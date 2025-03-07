"use client";

import { animals_categories } from "@/core/db-static/db_root_page";
import Link from "next/link";
import AnimalAvatar from "../animal-avatar";
import DynamicCarousel from "../carousels/carousel";

const AnimalCategory = () => {
  return (
    <div className="relative mb-12 w-full">
      <h2 className="mb-6 text-center text-3xl font-bold text-gray-900 dark:text-white">
        Per chi stai comprando? 🐾
      </h2>
      <DynamicCarousel
        data={animals_categories}
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
