"use client";

import { IUser } from "@/core/validators";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import UserButton from "./shared/header/user-button";

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
  user: IUser | null;
}

export default function SidebarMenu({
  categories,
  onClose,
  user,
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
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setActiveCategory(null);
                    }}
                    className="flex items-center text-gray-600 hover:text-black"
                  >
                    <ArrowLeft className="mr-2" size={18} />
                    {selectedCategory.mainTitle}
                  </button>
                  <button
                    onClick={onClose}
                    className="text-gray-600 hover:text-black"
                  >
                    <X size={22} />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Categorie</h2>
                <button
                  onClick={onClose}
                  className="text-gray-600 hover:text-black"
                >
                  <X size={22} />
                </button>
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
                  <button
                    key={index}
                    className="flex w-full items-center justify-between rounded-lg border-b border-gray-200 px-3 py-2 text-left text-gray-700 hover:bg-gray-100"
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
                  </button>
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
                        <button
                          className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-gray-700 hover:bg-gray-100"
                          onClick={() => setActiveCategory(subCategory)}
                        >
                          <span>{subCategory.title}</span>
                          <ChevronRight size={18} />
                        </button>
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
          <UserButton userLogged={user} />
        </div>
      </motion.div>
    </div>
  );
}
