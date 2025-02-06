"use client";

import { generateSlug } from "@/lib/utils";
import { motion } from "framer-motion";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export interface ICategories {
  title: string;
  items: { name: string; slug: string }[];
}

const categoriesDefault: ICategories[] = [
  { title: "", items: [{ name: "", slug: "" }] },
];

const brandsDefault: string[] = [];

export default function MegaMenu({
  section = "Categoria",
  categories = categoriesDefault,
  brands = brandsDefault,
  image = "/images/placeholder.jpg",
}: {
  section: string;
  categories: ICategories[];
  brands: string[];
  image?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const sectionSlug = generateSlug(section);

  return (
    /*  <nav className="wrapper relative z-50"> */
    <>
      <div
        className=" cursor-pointer py-4  hover:text-gray-700"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <Link href={`/category/${sectionSlug}`}>{section}</Link>
      </div>

      {isOpen && (
        <div className="max-w-8xl absolute inset-x-0 top-full grid w-full  grid-cols-5 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
          <div
            className=" col-span-4 grid w-full grid-cols-4 gap-6   p-6 sm:px-6 md:px-10 lg:mx-auto"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            {/* Categorie */}
            <div className="col-span-3 grid grid-cols-3 gap-6">
              {categories.map((category, index) => (
                <div key={index}>
                  <h3 className="mb-2 text-lg font-semibold text-black">
                    {category.title}
                  </h3>
                  <ul>
                    {category.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="mb-1 cursor-pointer text-gray-600 hover:text-black"
                      >
                        <Link href={`/category/${item.slug}`}>{item.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Brand */}
            <div className="col-span-1">
              <h3 className="mb-4 text-lg font-semibold text-black">
                Top Brand per Cani
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {brands.map((brand, index) => (
                  <motion.div
                    key={index}
                    className=" align-center col-span-1 flex justify-center "
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 + index / 7 }}
                  >
                    <div className="flex size-20 items-center justify-center rounded-lg border shadow-sm">
                      <Image
                        src={/* brand || */ "/images/placeholder.jpg"}
                        alt="Brand logo"
                        width={60}
                        height={60}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          <motion.div
            className=" align-center col-span-1 flex justify-center bg-primary-500"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <Image
              height="0"
              width="0"
              sizes="100vw"
              className="mt-auto size-max object-cover object-center"
              src={image}
              alt="Brand logo"
            />
          </motion.div>
        </div>
      )}
    </>
    /*  </nav> */
  );
}
