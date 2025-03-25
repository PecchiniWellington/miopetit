"use client";

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
  return (
    <section className="relative mx-auto w-full max-w-7xl ">
      {/* Gradient background effect */}
      <div className="pointer-events-none absolute inset-0 -z-10  opacity-60 blur-2xl" />

      <h2 className="mb-10 text-center text-4xl font-extrabold tracking-tight text-purple-700">
        Indispensabile per il tuo{" "}
        <span className="capitalize text-green-600">{mainCategory} 🐾</span>
      </h2>

      <DynamicCarousel
        data={indispensables}
        itemsPerView={3}
        gap={24}
        renderItem={({ image, label, href }) => (
          <Link href={`/${href}`}>
            <div className="relative mx-auto flex h-full flex-col items-center justify-center rounded-xl bg-white p-4 shadow-md transition hover:scale-[1.03] hover:shadow-xl">
              <AnimalAvatar image={"/images/" + image} name={label} />
              {/* <span className="mt-4 text-center text-sm font-semibold text-gray-700">
                {label}
              </span> */}
            </div>
          </Link>
        )}
      />
    </section>
  );
};

export default IndispensableList;
