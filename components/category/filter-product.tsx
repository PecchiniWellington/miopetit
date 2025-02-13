"use client";
import { BadgeStatus } from "@/components/shared/badge-status";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { STATUS } from "@/lib/constants";
import { Filter, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const prices = [
  { name: "$0 to $50", value: "0-50" },
  { name: "$51 to $100", value: "51-100" },
  { name: "$101 to $200", value: "101-200" },
  { name: "$201 & Above", value: "201-500" },
];

const ratings = [4, 3, 2, 1];

const FilterProduct = ({
  categories,
  q = "all",
  category = "all",
  price = "all",
  rating = "all",
  sort = "newest",
  page = "1",
  slug,
  className,
}: {
  categories: {
    category: {
      id: string;
      name: string;
      slug: string;
    };
    _count: number;
    categoryId: string | null;
  }[];
  q?: string;
  category?: string;
  price?: string;
  rating?: string;
  sort: string;
  page: string;
  slug: string;
  className?: string;
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const getFilterUrl = ({
    c,
    s,
    p,
    r,
    pg,
  }: {
    c?: string;
    s?: string;
    p?: string;
    r?: string;
    pg?: string;
  }) => {
    const params = { q, category, price, rating, sort, page };
    if (c) params.category = c;
    if (s) params.sort = s;
    if (p) params.price = p;
    if (r) params.rating = r;
    if (pg) params.page = pg;

    return `/${slug}?${new URLSearchParams(params).toString()}`;
  };

  return (
    <div className={`w-full ${className} `}>
      {/* Bottone per aprire il menu su mobile */}
      <Button
        onClick={() => setIsFilterOpen(true)}
        className="flex w-full items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-100 md:hidden"
      >
        <Filter size={18} /> Filtri
      </Button>
      {/* Sidebar Filtri */}
      <aside
        className={`fixed inset-y-0 left-0 z-10 w-3/4 max-w-xs bg-white  px-6 py-12 transition-transform md:relative md:block md:w-full md:translate-x-0 md:p-0 ${
          isFilterOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setIsFilterOpen(false)}
          className="absolute right-4 top-4 md:hidden"
        >
          <X size={24} />
        </button>

        <div>
          {/* Categorie */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="categories">
              <AccordionTrigger className="text-lg font-semibold">
                Categorie
              </AccordionTrigger>
              <AccordionContent>
                <ul>
                  <li>
                    <Link
                      scroll={false}
                      href={getFilterUrl({ c: "all" })}
                      className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      {category === "all" ? (
                        <BadgeStatus status={STATUS.PRIMARY_ACTIVE}>
                          Tutte
                        </BadgeStatus>
                      ) : (
                        "Tutte"
                      )}
                    </Link>
                  </li>
                  {categories.map((x) => (
                    <li key={x.id}>
                      <Link
                        scroll={false}
                        href={getFilterUrl({ c: x.slug })}
                        className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        {category === x.slug ? (
                          <BadgeStatus status={STATUS.PRIMARY_ACTIVE}>
                            {x.name}
                          </BadgeStatus>
                        ) : (
                          x.name
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Prezzi */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="prices">
              <AccordionTrigger className="text-lg font-semibold">
                Prezzo
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2">
                  <li>
                    <Link
                      scroll={false}
                      href={getFilterUrl({ p: "all" })}
                      className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      {price === "all" ? (
                        <BadgeStatus status={STATUS.PRIMARY_ACTIVE}>
                          Tutti
                        </BadgeStatus>
                      ) : (
                        "Tutti"
                      )}
                    </Link>
                  </li>
                  {prices.map((x) => (
                    <li key={x.value}>
                      <Link
                        scroll={false}
                        href={getFilterUrl({ p: x.value })}
                        className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        {price === x.value ? (
                          <BadgeStatus status={STATUS.PRIMARY_ACTIVE}>
                            {x.name}
                          </BadgeStatus>
                        ) : (
                          x.name
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Valutazioni */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="ratings">
              <AccordionTrigger className="text-lg font-semibold">
                Recensioni
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2">
                  <li>
                    <Link
                      scroll={false}
                      href={getFilterUrl({ r: "all" })}
                      className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      {rating === "all" ? (
                        <BadgeStatus status={STATUS.PRIMARY_ACTIVE}>
                          Tutte
                        </BadgeStatus>
                      ) : (
                        "Tutte"
                      )}
                    </Link>
                  </li>
                  {ratings.map((r) => (
                    <li key={r}>
                      <Link
                        scroll={false}
                        href={getFilterUrl({ r: `${r}` })}
                        className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        {rating === r.toString() ? (
                          <BadgeStatus
                            status={STATUS.PRIMARY_ACTIVE}
                          >{`${r} Stelle & più`}</BadgeStatus>
                        ) : (
                          `${r} Stelle & più`
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </aside>
    </div>
  );
};

export default FilterProduct;
