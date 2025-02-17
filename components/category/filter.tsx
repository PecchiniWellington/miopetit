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
import { useSearchParams } from "next/navigation";

const Filter = ({
  productFilters,
  className,
}: {
  productFilters: unknown[];

  className?: string;
}) => {
  const { updateFilters, isAccordionOpen, setIsAccordionOpen } =
    useFilterContext();
  const searchParams = useSearchParams();

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
          {Object.entries(productFilters).map(([key, values]) => (
            <Accordion key={key} type="single" collapsible className="w-full">
              <AccordionItem value={key}>
                <AccordionTrigger className="text-lg font-semibold">
                  {transformKey(key.charAt(0).toUpperCase() + key.slice(1))}
                </AccordionTrigger>
                <AccordionContent>
                  <ul>
                    {Array.isArray(values) &&
                      values.map(
                        (value: {
                          slug: string;
                          id: string;
                          name: string;
                          unitValue: string;
                          unitOfMeasure: string;
                        }) => {
                          const filterValue =
                            value.slug ||
                            value.id ||
                            (typeof value === "string" ? value : "");
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
                        }
                      )}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default Filter;
