"use client";
import { useFilterContext } from "@/context/filter-context";
import { transformKey } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, FilterIcon, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import BrandButton from "../shared/brand-components/brand-button";

interface FilterProps {
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
}

const Filter: React.FC<FilterProps> = ({ productFilters, className }) => {
  const { updateFilters, isAccordionOpen, setIsAccordionOpen } =
    useFilterContext();
  const searchParams = useSearchParams();

  const [openKeys, setOpenKeys] = useState<Record<string, boolean>>({});

  const toggleAccordion = (key: string) => {
    setOpenKeys((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className={`w-full ${className}`}>
      <BrandButton
        className="md:hidden"
        onClick={() => setIsAccordionOpen(true)}
        variant="flat"
        icon={<FilterIcon size={18} />}
      >
        Filtri
      </BrandButton>

      <aside
        className={`fixed inset-y-0 left-0 z-10 w-3/4 max-w-xs  px-6 py-12 transition-transform md:relative md:block md:w-full md:translate-x-0 md:p-0 ${
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
          {Object.entries(productFilters).map(([key, values]) => {
            const isOpen = !!openKeys[key];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm transition hover:shadow-md"
              >
                <div
                  className="flex cursor-pointer items-center justify-between font-medium text-gray-800"
                  onClick={() => toggleAccordion(key)}
                >
                  {transformKey(key.charAt(0).toUpperCase() + key.slice(1))}
                  <ChevronDown
                    className={`transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-2 space-y-2 overflow-hidden"
                    >
                      {Array.isArray(values) &&
                        values.map((value) => {
                          const filterValue =
                            typeof value === "string"
                              ? value
                              : typeof value === "object"
                                ? value.slug || value.id || ""
                                : "";
                          const isActive =
                            searchParams.get(key) === filterValue;

                          return (
                            <BrandButton
                              size="small"
                              key={filterValue}
                              onClick={() =>
                                updateFilters(key, filterValue.toString())
                              }
                              className="h-fit"
                              variant={isActive ? "primary" : "outline"}
                            >
                              {typeof value === "string"
                                ? value
                                : typeof value === "object" && "name" in value
                                  ? value.name
                                  : typeof value === "object"
                                    ? `${value.unitValue ?? ""} ${
                                        value.unitOfMeasure ?? ""
                                      }`
                                    : ""}
                            </BrandButton>
                          );
                        })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </aside>
    </div>
  );
};

export default Filter;
