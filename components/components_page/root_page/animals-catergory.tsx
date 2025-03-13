"use client";

import AnimalAvatar from "@/components/animal-avatar";
import DynamicCarousel from "@/components/carousels/carousel";
import { animals_categories } from "@/core/db-static/db_root_page";
import { useTranslations } from "next-intl";
import Link from "next/link";

const AnimalCategory = () => {
  const t = useTranslations("");
  return (
    <div className="relative mb-12 w-full">
      <h2 className="mb-6 text-center text-3xl font-bold text-gray-900 dark:text-white">
        {t("HomePage.who_are_you_buying_for")} 🐾
      </h2>
      <DynamicCarousel
        data={animals_categories}
        itemsPerView={4}
        gap={20}
        renderItem={({ name, image }) => (
          <Link href={`/${name}`}>
            <div className="relative mx-auto h-full ">
              <AnimalAvatar
                image={"/images/" + image}
                name={t("Shared." + name.replace(/\s+/g, "_"))}
              />
            </div>
          </Link>
        )}
      />
    </div>
  );
};

export default AnimalCategory;
