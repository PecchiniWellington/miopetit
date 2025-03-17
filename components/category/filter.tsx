"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useFilterContext } from "@/context/filter-context";

import { transformKey } from "@/lib/utils";
import { FilterIcon, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import BrandButton from "../shared/brand-components/brand-button";
import BrandBadge from "../shared/brand-components/brand-badge";

const Filter = ({
  productFilters,
  className,
}: {
  productFilters: {
    [key: string]:
      | string
      | number
      | (
          | string
          | number
          | {
              slug?: string;
              id?: string;
              name?: string;
              unitValue?: string;
              unitOfMeasure?: string;
            }
        )[]
      | {
          [key: string]: string | number;
        };
  };

  className?: string;
}) => {
  const { updateFilters, isAccordionOpen, setIsAccordionOpen } =
    useFilterContext();
  const searchParams = useSearchParams();

  return (
    <div className={`w-full ${className}`}>
      <BrandButton
        onClick={() => setIsAccordionOpen(true)}
        variant="flat"
        icon={<FilterIcon size={18} />}
      >
        Filtri
      </BrandButton>

      <aside
        className={`fixed inset-y-0 left-0 z-10 w-3/4 max-w-xs bg-white px-6 py-12 transition-transform md:relative md:block md:w-full md:translate-x-0 md:p-0 ${
          isAccordionOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <BrandButton
          onClick={() => setIsAccordionOpen(false)}
          className="absolute right-4 top-4 md:hidden"
        >
          <X size={24} />
        </BrandButton>

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
                      values.map((value) => {
                        const filterValue =
                          typeof value === "string"
                            ? value
                            : typeof value === "object"
                              ? value.slug || value.id || ""
                              : "";
                        const isActive = searchParams.get(key) === filterValue;

                        return (
                          <li key={filterValue}>
                            <BrandButton
                              onClick={() =>
                                updateFilters(key, filterValue.toString())
                              }
                              variant="flat"
                            >
                              <BrandBadge
                                variant={isActive ? "primary" : "default"}
                                label={
                                  typeof value === "string"
                                    ? value
                                    : typeof value === "object" &&
                                        "name" in value
                                      ? value.name
                                      : typeof value === "object"
                                        ? `${value.unitValue ?? ""} ${value.unitOfMeasure ?? ""}`
                                        : ""
                                }
                              />
                            </BrandButton>
                          </li>
                        );
                      })}
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
