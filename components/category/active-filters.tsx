"use client";

import { BadgeStatus } from "@/components/shared/badge-status";
import { useFilterContext } from "@/context/filter-context";
import { STATUS } from "@/lib/constants";
import { transformKey } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

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

  return (
    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
      {Object.entries(filters).map(([key, value]) =>
        value !== "all" ? (
          <BadgeStatus
            key={key}
            status={filterStatusMap[key] || STATUS.DEFAULT}
          >
            {key === "rating"
              ? `${value} ⭐ & più`
              : typeof value === "object"
                ? value.name || `${value.unitValue} ${value.unitOfMeasure}`
                : transformKey(key.charAt(0).toUpperCase() + key.slice(1)) +
                  `: ${value}`}

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
        <Button
          onClick={onResetFilter} // ✅ Chiama la funzione di reset dal padre
          className="flex items-center gap-2 rounded-full border border-purple-500 bg-white px-4 py-2 text-sm font-medium text-purple-700 shadow-md transition-all hover:bg-purple-100 hover:text-purple-900"
        >
          🔄 Reset Filtri
        </Button>
      )}
    </div>
  );
};

export default ActiveFilters;
