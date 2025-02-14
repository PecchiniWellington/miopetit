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

const CategoryFilter = ({
  filters,
  slug,
  className,
}: {
  filters: { [key: string]: any };
  slug: string;
  className?: string;
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const getFilterUrl = (param: string, value: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(param, value);
    return `/${slug}?${searchParams.toString()}`;
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Bottone per mobile */}
      <Button
        onClick={() => setIsFilterOpen(true)}
        className="flex w-full items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-100 md:hidden"
      >
        <Filter size={18} /> Filtri
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
          {Object.entries(filters).map(([key, values]) => (
            <Accordion key={key} type="single" collapsible className="w-full">
              <AccordionItem value={key}>
                <AccordionTrigger className="text-lg font-semibold">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </AccordionTrigger>
                <AccordionContent>
                  <ul>
                    {Array.isArray(values)
                      ? values.map((value: any) => (
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
                      : key === "price" && (
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

export default CategoryFilter;
