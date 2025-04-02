"use client";

import { useLocale } from "next-intl";
import Link from "next/link";
import AnimalAvatar from "../shared/animal-avatar";
import DynamicCarousel from "./carousel";

const IndispensableList = ({
  indispensables,
  mainCategory,
}: {
  indispensables?: { image: string; href: string; label: string }[];
  mainCategory: string;
}) => {
  const locale = useLocale();
  const mainCategoryPart = mainCategory.split("/")[0];
  return (
    <section className="relative mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Soft blurred background */}
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-purple-100/30 via-white to-green-50/30 opacity-40 blur-3xl" />

      <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-purple-700 sm:text-4xl">
        Indispensabile per il tuo{" "}
        <span className="capitalize text-green-600">{mainCategoryPart} 🐾</span>
      </h2>

      <DynamicCarousel
        data={indispensables}
        itemsPerView={3}
        gap={24}
        renderItem={({ image, label, href }) => (
          <Link href={`/${locale}${href}`}>
            <div className="group relative mx-auto flex size-full flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
              <AnimalAvatar image={"/images/" + image} name={label} />
            </div>
          </Link>
        )}
      />
    </section>
  );
};

export default IndispensableList;
