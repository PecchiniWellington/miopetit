"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
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
  name: string;
  slug: string;
  children?: IMenuItem[];
}

interface MegaMenuProps {
  data: {
    name: string;
    slug: string;
    children: ICategory[];
  } | null;
  brands?: string[];
  imgSrc: string;
}

export default function MegaMenu({ data, brands = [], imgSrc }: MegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("MegaMenu");

  return (
    <>
      {/* Main Title (Cani, Gatti, ecc.) */}
      <div
        className="cursor-pointer p-4 text-lg font-semibold text-gray-700 transition-all duration-300 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Link href={`/${data?.slug}`}>{t(data?.slug)}</Link>
      </div>

      {isOpen && (
        <div className="absolute inset-x-0 top-full grid w-full grid-cols-5 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
          <div
            className="col-span-4 grid w-full grid-cols-4 gap-6 p-6 sm:px-6 md:px-10 lg:mx-auto"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            onClick={() => setIsOpen(!isOpen)}
          >
            {/* Sezione Categorie */}
            <CategorySection
              categories={data?.children}
              mainCategory={data?.slug || ""}
            />

            {/* Sezione Brand */}
            {brands.length > 0 && data && (
              <BrandSection brands={brands} mainTitle={data.name} />
            )}
          </div>

          <motion.div
            className="col-span-1 flex justify-center bg-primary-500 bg-gradient-to-r from-indigo-500 to-purple-600 align-bottom"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Immagine Principale */}
            <div className="col-span-1 flex justify-center bg-primary-500 bg-gradient-to-r from-indigo-500 to-purple-600 align-bottom">
              <motion.div
                className="mt-auto"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  height={0}
                  width={0}
                  sizes="100vw"
                  className="mt-auto size-max object-cover object-center"
                  src={imgSrc || "/images/placeholder.jpg"}
                  alt={data?.name || "placeholder"}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
