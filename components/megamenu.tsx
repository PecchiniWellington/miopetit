"use client";

import { generateSlug } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface IMenuItem {
  name: string;
  slug: string;
}

interface ICategory {
  title: string;
  items: IMenuItem[];
}

interface MegaMenuProps {
  data: {
    mainTitle: string;
    img: string;
    menu: ICategory[];
  };
  brands?: string[];
}

export default function MegaMenu({ data, brands = [] }: MegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const sectionSlug = generateSlug(data.mainTitle);

  return (
    <>
      {/* Main Title (Cani, Gatti, ecc.) */}
      <div
        className="cursor-pointer py-4 hover:text-gray-700"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <Link href={`/category/${sectionSlug}`}>{data.mainTitle}</Link>
      </div>

      {isOpen && (
        <div className="max-w-8xl absolute inset-x-0 top-full grid w-full grid-cols-5 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
          <div
            className="col-span-4 grid w-full grid-cols-4 gap-6 p-6 sm:px-6 md:px-10 lg:mx-auto"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            {/* Categorie */}
            <div className="col-span-3 grid grid-cols-3 gap-6">
              {data.menu.map((category, index) => (
                <div key={index}>
                  <h3 className="mb-2 text-lg font-semibold text-black">
                    {category.title}
                  </h3>
                  {category.items.length > 0 ? (
                    <ul>
                      {category.items.map((item, idx) => (
                        <li
                          key={idx}
                          className="mb-1 cursor-pointer text-gray-600 hover:text-black"
                        >
                          <Link href={`/category/${item.slug}`}>
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="italic text-gray-400">Nessun elemento</p>
                  )}
                </div>
              ))}
            </div>

            {/* Sezione Brand */}
            {brands.length > 0 && (
              <div className="col-span-1">
                <h3 className="mb-4 text-lg font-semibold text-black">
                  Top Brand per {data.mainTitle}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {brands.map((brand, index) => (
                    <motion.div
                      key={index}
                      className="col-span-1 flex justify-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1 + index / 7 }}
                    >
                      <div className="flex size-20 items-center justify-center rounded-lg border shadow-sm">
                        <Image
                          src={"/images/placeholder.jpg"} // Qui puoi mettere il logo del brand se disponibile
                          alt={brand}
                          width={60}
                          height={60}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Immagine principale del menu */}
          <motion.div
            className="align-center col-span-1 flex justify-center bg-primary-500"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <Image
              height={0}
              width={0}
              sizes="100vw"
              className="mt-auto size-max object-cover object-center"
              src={data.img}
              alt={data.mainTitle}
            />
          </motion.div>
        </div>
      )}
    </>
  );
}
