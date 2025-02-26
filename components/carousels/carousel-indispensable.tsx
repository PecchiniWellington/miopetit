"use client";

import Link from "next/link";
import AnimalAvatar from "../animal-avatar";
import DynamicCarousel from "./carousel";

const IndispensableList = ({
  indispensables,
  mainCategory,
}: {
  indispensables: { image: string; href: string; label: string }[];
  mainCategory: string;
}) => {
  return (
    <div className="relative  w-full">
      <h2 className="mb-6 text-center text-3xl font-bold text-gray-900 dark:text-white">
        Indispensabile per il tuo{" "}
        {mainCategory.charAt(0).toUpperCase() + mainCategory.slice(1)} 🐾
      </h2>
      <DynamicCarousel
        data={indispensables}
        itemsPerView={3}
        gap={20}
        renderItem={({ image, label, href }) => (
          <Link href={`/${href}`}>
            <div className="relative mx-auto h-full ">
              <AnimalAvatar image={image} name={label} />
            </div>
          </Link>
        )}
      />
    </div>
  );
};

export default IndispensableList;
