"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import BrandButton from "../brand-components/brand-button";
import UserButton from "./user-button";

interface IMenuItem {
  name: string;
  slug: string;
}

interface ICategory {
  title: string;
  items: IMenuItem[];
}

interface ISidebarMenuProps {
  categories: {
    mainTitle: string;
    img: string;
    menu: ICategory[];
  }[];
  onClose: () => void;
}

export default function SidebarMenu({
  categories,
  onClose,
}: ISidebarMenuProps) {
  const [activeCategory, setActiveCategory] = useState<ICategory | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<{
    mainTitle: string;
    img: string;
  } | null>(null);

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />

      {/* Sidebar */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.3 }}
        className="relative z-50 flex h-full w-80 flex-col justify-between bg-white p-6 shadow-lg"
      >
        <div>
          {/* Header con immagine */}
          <div className="flex flex-col border-b pb-4">
            {selectedCategory ? (
              <>
                <Image
                  src={selectedCategory.img}
                  alt={selectedCategory.mainTitle}
                  width={50}
                  height={50}
                  className="mx-auto rounded-full"
                />
                <div className="mt-2 flex items-center justify-between">
                  <BrandButton
                    onClick={() => {
                      setSelectedCategory(null);
                      setActiveCategory(null);
                    }}
                    variant="flat"
                  >
                    <ArrowLeft className="mr-2" size={18} />
                    {selectedCategory.mainTitle}
                  </BrandButton>
                  <BrandButton onClick={() => onClose()} variant="flat">
                    <X size={22} />
                  </BrandButton>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Categorie</h2>
                <BrandButton variant="flat" onClick={() => onClose()}>
                  <X size={22} />
                </BrandButton>
              </div>
            )}
          </div>
          {/* Contenuto dinamico */}
          <AnimatePresence mode="wait">
            {!selectedCategory ? (
              <motion.div
                key="main-categories"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="mt-4 space-y-3 "
              >
                {categories.map((category, index) => (
                  <BrandButton
                    key={index}
                    variant="flat"
                    onClick={() => {
                      setSelectedCategory({
                        mainTitle: category.mainTitle,
                        img: category.img,
                      });
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        src={category.img}
                        alt={category.mainTitle}
                        width={30}
                        height={30}
                        className="rounded-full"
                      />
                      <span>{category.mainTitle}</span>
                    </div>
                    <ChevronRight size={18} />
                  </BrandButton>
                ))}
              </motion.div>
            ) : !activeCategory ? (
              <motion.div
                key="subcategory-list"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="mt-4 space-y-3"
              >
                {categories
                  .find((cat) => cat.mainTitle === selectedCategory.mainTitle)
                  ?.menu.map((subCategory, index) => (
                    <div key={index}>
                      {subCategory.items.length > 0 ? (
                        <BrandButton
                          variant="flat"
                          onClick={() => setActiveCategory(subCategory)}
                        >
                          <span>{subCategory.title}</span>
                          <ChevronRight size={18} />
                        </BrandButton>
                      ) : (
                        <Link
                          href={`/category/${subCategory.title.toLowerCase().replace(/\s+/g, "-")}`}
                          className="flex items-center justify-between rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          {subCategory.title}
                          <ChevronRight size={18} />
                        </Link>
                      )}
                    </div>
                  ))}
              </motion.div>
            ) : (
              <motion.div
                key="submenu"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="mt-4 space-y-3"
              >
                {activeCategory.items.map((item, idx) => (
                  <Link
                    key={idx}
                    href={`/category/${item.slug}`}
                    className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    {item.name}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="mt-auto">
          <UserButton />
        </div>
      </motion.div>
    </div>
  );
}
