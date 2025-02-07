"use client";

import { generateSlug } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BrandSection } from "./brand-section";
import { CategorySection } from "./category-section";

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
            <CategorySection menu={data.menu} />
            {/* Sezione Brand */}
            {brands.length > 0 && (
              <BrandSection brands={brands} mainTitle={data.mainTitle} />
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
