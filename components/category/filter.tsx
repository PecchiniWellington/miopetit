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
import { transformKey } from "@/lib/utils";
import { FilterIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Filter = ({
  categories,
  slug,
  className,
}: {
  categories: unknown[];
  filters?: { [key: string]: string };
  slug: string;
  className?: string;
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }>({});

  console.log("Categorie:", categories);
  const router = useRouter();

  useEffect(() => {
    // Aggiorna l'URL ogni volta che selectedFilters cambia
    const params = new URLSearchParams();

    Object.entries(selectedFilters).forEach(([key, value]) => {
      if (value !== "all") {
        params.set(key, value);
      }
    });

    router.push(`/${slug}?${params.toString()}`, { scroll: false });
  }, [selectedFilters, router, slug]);

  const updateFilters = (key: string, value: string) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = {
        ...prevFilters,
        [key]: value, // Sovrascrive il valore se la chiave esiste, altrimenti la aggiunge
      };

      console.log("Filtri aggiornati:", updatedFilters);
      return updatedFilters;
    });
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
          {Object.entries(categories).map(([key, values]) =>
            key !== "category" ? (
              <Accordion key={key} type="single" collapsible className="w-full">
                <AccordionItem value={key}>
                  <AccordionTrigger className="text-lg font-semibold">
                    {transformKey(key.charAt(0).toUpperCase() + key.slice(1))}
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul>
                      {Array.isArray(values) &&
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        values.map((value: any) => (
                          <li key={value.id || value}>
                            <button
                              onClick={() =>
                                updateFilters(key, value.id || value)
                              }
                              className={`block w-full rounded-lg px-3 py-2 text-left text-gray-700 hover:bg-gray-100 ${
                                selectedFilters[key] === (value.id || value)
                                  ? "bg-gray-200"
                                  : ""
                              }`}
                            >
                              <BadgeStatus status={STATUS.PRIMARY_ACTIVE}>
                                {typeof value === "object"
                                  ? value.name ||
                                    `${value.unitValue} ${value.unitOfMeasure}`
                                  : value}
                              </BadgeStatus>
                            </button>
                          </li>
                        ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : null
          )}
        </div>
      </aside>
    </div>
  );
};

export default Filter;
