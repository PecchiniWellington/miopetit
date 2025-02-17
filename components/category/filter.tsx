"use client";
import { BadgeStatus } from "@/components/shared/badge-status";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useFilterContext } from "@/context/filter-context";

import { STATUS } from "@/lib/constants";
import { transformKey } from "@/lib/utils";
import { FilterIcon, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const Filter = ({
  categories,
  slug,
  className,
  onFilterChange,
}: {
  categories: unknown[];
  slug: string;
  className?: string;
  onFilterChange: (filters: { [key: string]: any }) => void;
}) => {
  const { filters, updateFilters, isAccordionOpen, setIsAccordionOpen } =
    useFilterContext();
  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ Evitiamo loop infiniti aggiornando solo se `filters` cambia
  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== "all") {
        params.set(key, value);
      }
    });

    router.push(`/${slug}?${params.toString()}`, { scroll: false });

    onFilterChange(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, router, slug]);

  return (
    <div className={`w-full ${className}`}>
      <Button
        onClick={() => setIsAccordionOpen(true)}
        className="flex w-full items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-100 md:hidden"
      >
        <FilterIcon size={18} /> Filtri
      </Button>

      <aside
        className={`fixed inset-y-0 left-0 z-10 w-3/4 max-w-xs bg-white px-6 py-12 transition-transform md:relative md:block md:w-full md:translate-x-0 md:p-0 ${
          isAccordionOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Button
          onClick={() => setIsAccordionOpen(false)}
          className="absolute right-4 top-4 md:hidden"
        >
          <X size={24} />
        </Button>

        <div>
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
                        values.map((value: any) => {
                          // ✅ Usa lo slug se disponibile, altrimenti usa l'ID
                          const filterValue = value.slug || value.id || value;
                          const isActive =
                            searchParams.get(key) === filterValue;

                          return (
                            <li key={filterValue}>
                              <Button
                                onClick={() => updateFilters(key, filterValue)}
                                className={`block w-full rounded-lg px-3 py-2 text-left text-gray-700 hover:bg-gray-100 ${
                                  isActive ? "bg-gray-200" : ""
                                }`}
                              >
                                <BadgeStatus
                                  status={
                                    isActive
                                      ? STATUS.PRIMARY_ACTIVE
                                      : STATUS.DEFAULT
                                  }
                                >
                                  {typeof value === "object"
                                    ? value.name ||
                                      `${value.unitValue} ${value.unitOfMeasure}`
                                    : value}
                                </BadgeStatus>
                              </Button>
                            </li>
                          );
                        })}
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
