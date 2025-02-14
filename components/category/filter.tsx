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
import { FilterIcon, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const ratings = [4, 3, 2, 1];

const Filter = ({
  categories,
  slug,
  className,
}: {
  categories: any;
  filters?: { [key: string]: string };
  slug: string;
  className?: string;
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Assicura che filters abbia almeno i valori di default per evitare errori
  const activeFilters = {
    price: categories.price || "all",
    rating: categories.rating || "all",
    ...categories,
  };

  // Funzione per mantenere i filtri esistenti senza sovrascriverli
  const getFilterUrl = (param: string, value: string) => {
    const searchParams =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search)
        : new URLSearchParams();

    if (value === "all") {
      searchParams.delete(param); // Rimuove il filtro se è "all"
    } else {
      searchParams.set(param, value); // Aggiunge o aggiorna il filtro
    }

    return `/${slug}?${searchParams.toString()}`;
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Bottone per mobile */}
      <Button
        onClick={() => setIsFilterOpen(true)}
        className="flex w-full items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-100 md:hidden"
      >
        <FilterIcon size={18} /> Filtri
      </Button>

      {/* Sidebar Filtri */}
      <aside
        className={`fixed inset-y-0 left-0 z-10 w-3/4 max-w-xs bg-white px-6 py-12 transition-transform md:relative md:block md:w-full md:translate-x-0 md:p-0 ${
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
          {/* Filtri Generali */}

          {Object.entries(activeFilters).map(([key, values]) =>
            key !== "category" ? (
              <Accordion key={key} type="single" collapsible className="w-full">
                <AccordionItem value={key}>
                  <AccordionTrigger className="text-lg font-semibold">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul>
                      {Array.isArray(values) ? (
                        values.map((value: any) => (
                          <li key={value.id || value}>
                            <Link
                              scroll={false}
                              href={getFilterUrl(key, value.id || value)}
                              className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
                            >
                              <BadgeStatus status={STATUS.PRIMARY_ACTIVE}>
                                {typeof value === "object"
                                  ? value.name ||
                                    `${value.unitValue} ${value.unitOfMeasure}`
                                  : value}
                              </BadgeStatus>
                            </Link>
                          </li>
                        ))
                      ) : key === "price" && values !== "all" ? (
                        <li>
                          <Link
                            scroll={false}
                            href={getFilterUrl(
                              key,
                              `${values.min}-${values.max}`
                            )}
                            className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
                          >
                            <BadgeStatus
                              status={STATUS.PRIMARY_ACTIVE}
                            >{`€${values.min} - €${values.max}`}</BadgeStatus>
                          </Link>
                        </li>
                      ) : null}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : null
          )}

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
                      href={getFilterUrl("rating", "all")}
                      className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      {activeFilters.rating === "all" ? (
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
                        href={getFilterUrl("rating", `${r}`)}
                        className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        {activeFilters.rating === r.toString() ? (
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

export default Filter;
