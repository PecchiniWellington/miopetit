"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ICategory } from "@/core/validators";
import { debounce } from "lodash";
import { SearchIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const Search = ({ categories }: { categories: ICategory[] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]); // Da popolare con i dati reali
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null); // Ref per l'intero componente

  // Simulazione ricerca con debounce
  const fetchSearchResults = debounce((query: string) => {
    if (!query) {
      setSearchResults([]);
      setIsDropdownVisible(false);
      return;
    }

    // Simulazione di dati fittizi per il dropdown
    setTimeout(() => {
      setSearchResults([
        {
          id: "1",
          slug: "kit-risparmio-felix",
          name: "Kit Risparmio Felix",
          price: "€54.90",
          image: "/images/product1.png",
        },
        {
          id: "2",
          slug: "felix-ghiottonerie",
          name: "Felix Le Ghiottonerie Multipack",
          price: "€33.99",
          image: "/images/product2.png",
        },
        {
          id: "3",
          slug: "next-natural-cat",
          name: "Next Natural Cat Multipack",
          price: "€7.96",
          image: "/images/product3.png",
        },
      ]);
      setIsDropdownVisible(true);
    }, 300);
  }, 300);

  // Chiudi il dropdown solo se clicchi fuori dall'intero componente search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isDropdownVisible) {
      document.body.style.overflow = "hidden"; // Blocca lo scroll
    } else {
      document.body.style.overflow = ""; // Ripristina lo scroll
    }

    return () => {
      document.body.style.overflow = ""; // Assicura che venga ripristinato quando il componente si smonta
    };
  }, [isDropdownVisible]);

  return (
    <>
      {isDropdownVisible && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-65 transition-opacity"></div>
      )}

      <div
        ref={searchRef}
        className="relative z-50 w-[200px] md:w-full md:max-w-lg"
      >
        <form
          action="/search"
          method="GET"
          className="flex w-full items-center space-x-3 rounded-full bg-white p-2 shadow-md transition-all duration-300 focus-within:ring-2 focus-within:ring-indigo-500"
        >
          {/* Dropdown delle categorie */}
          <span className="hidden md:block">
            <Select
              name="category"
              onValueChange={(value) => setSelectedCategory(value)}
            >
              <SelectTrigger className="w-40 rounded-full bg-gray-200 dark:bg-slate-800 dark:text-white">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent className="bg-gray-100 dark:bg-slate-800 dark:text-white">
                <SelectItem value="all" key="All">
                  All
                </SelectItem>
                {categories.data.map((x: ICategory) => (
                  <SelectItem value={x.slug} key={x.id}>
                    {x.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </span>

          {/* Campo di ricerca */}
          <div className="relative w-full">
            <Input
              autoComplete="off"
              name="q"
              type="text"
              placeholder="Cerca tra oltre 10.000 prodotti..."
              className="w-full rounded-full px-4 py-2 text-gray-700 focus:outline-none focus:ring-0 dark:bg-gray-800 dark:text-white"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                fetchSearchResults(e.target.value);
              }}
              onFocus={() => setIsDropdownVisible(true)}
            />
            {searchTerm && (
              <X
                className="absolute right-3 top-2 size-5 cursor-pointer text-gray-500"
                onClick={() => {
                  setSearchTerm("");
                  setSearchResults([]);
                  setIsDropdownVisible(false);
                }}
              />
            )}
          </div>

          {/* Pulsante di ricerca */}
          <button
            type="submit"
            className="flex items-center justify-center rounded-full bg-indigo-600 p-3 text-white transition-all duration-300 hover:bg-indigo-700"
          >
            <SearchIcon height={16} width={16} />
          </button>
        </form>

        {/* Dropdown con i risultati */}
        {isDropdownVisible && (
          <div
            className={`fixed inset-x-0 top-[90px] z-50 mx-4  rounded-lg border border-gray-200 bg-white p-4 shadow-lg transition-all duration-300 ease-in-out md:absolute md:left-0 md:top-full md:max-w-lg md:rounded-md`}
          >
            {/* Sezione prodotti più venduti */}
            <div className="mb-2">
              <h3 className="border-b pb-2 text-sm font-bold text-gray-700">
                🔥 PRODOTTI PIÙ VENDUTI
              </h3>
              {searchResults.slice(0, 5).map((product) => (
                <Link
                  href={`/product/${product.slug}`}
                  key={product.id}
                  className="flex items-center gap-3 p-2 transition hover:bg-gray-100"
                  onClick={() => setIsDropdownVisible(false)}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={40}
                    height={40}
                    className="rounded-md"
                  />
                  <div>
                    <p className="text-sm text-gray-800">{product.name}</p>
                    <p className="text-sm font-bold text-gray-600">
                      {product.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Sezione ricerche più popolari */}
            <div className="mt-4">
              <h3 className="border-b pb-2 text-sm font-bold text-gray-700">
                📌 PIÙ CERCATI ORA
              </h3>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {[
                  "Cibo Per Gatti",
                  "Crocchette Per Cani",
                  "Monge",
                  "Royal Canin",
                  "Seresto Collare",
                  "Trasportino",
                ].map((term, index) => (
                  <Link
                    href={`/search?query=${term.toLowerCase()}`}
                    key={index}
                    className="block rounded-md bg-gray-100 p-2 text-sm text-gray-800 transition hover:bg-gray-200"
                    onClick={() => setIsDropdownVisible(false)}
                  >
                    {term}
                  </Link>
                ))}
              </div>
            </div>

            {/* Sezione brand popolari */}
            <div className="mt-4">
              <h3 className="border-b pb-2 text-sm font-bold text-gray-700">
                ⭐ BRAND CONSIGLIATI
              </h3>
              <div className="mt-2 flex gap-3">
                {[
                  "/images/brand1.png",
                  "/images/brand2.png",
                  "/images/brand3.png",
                ].map((brand, index) => (
                  <Image
                    key={index}
                    src={brand}
                    alt="Brand"
                    width={50}
                    height={50}
                    className="rounded-md"
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
