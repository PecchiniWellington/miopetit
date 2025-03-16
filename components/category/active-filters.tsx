"use client";

import { BadgeStatus } from "@/components/shared/badge-status";
import { useFilterContext } from "@/context/filter-context";
import { STATUS } from "@/lib/constants";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import BrandButton from "../shared/brand-components/brand-button";

const ActiveFilters = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { filters, resetFilters, setIsAccordionOpen } = useFilterContext();

  const filterStatusMap: { [key: string]: string } = {
    q: STATUS.PRIMARY,
    category: STATUS.SUCCESS,
    price: STATUS.WARNING,
    rating: STATUS.DEFAULT,
  };

  const getUpdatedFilterUrl = (paramToRemove: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(paramToRemove);

    return `${pathname}?${params.toString()}`;
  };

  const onResetFilter = () => {
    resetFilters(); // ✅ Aggiorna i filtri nel contesto
    setIsAccordionOpen(false);
  };

  console.log("🔍 [ActiveFilters] - Filters:", filters);
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
      {Object.entries(filters).map(([key, value]) =>
        value !== "all" ? (
          <BadgeStatus
            key={key}
            status={filterStatusMap[key] || STATUS.DEFAULT}
          >
            {/*  {key === "rating"
              ? `${value} ⭐ & più`
              : typeof value === "object"
                ? value.name || `${value.unitValue} ${value.unitOfMeasure}`
                : transformKey(key.charAt(0).toUpperCase() + key.slice(1)) +
                  `: ${value}`} */}

            <Link
              scroll={false}
              href={getUpdatedFilterUrl(key)}
              className="ml-2 text-xs text-red-500 hover:underline"
            >
              ✖
            </Link>
          </BadgeStatus>
        ) : null
      )}

      {Object.keys(filters).length > 0 && (
        <BrandButton
          onClick={() => onResetFilter()} // ✅ Chiama la funzione di reset dal padre
        >
          🔄 Reset Filtri
        </BrandButton>
      )}
    </div>
  );
};

export default ActiveFilters;
