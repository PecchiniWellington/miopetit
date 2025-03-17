/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useFilterContext } from "@/context/filter-context";
import BrandButton from "../shared/brand-components/brand-button";
import BrandBadge from "../shared/brand-components/brand-badge";

const ActiveFilters = () => {
  const { filters, resetFilters, setIsAccordionOpen } = useFilterContext();

  const onResetFilter = () => {
    resetFilters(); // ✅ Aggiorna i filtri nel contesto
    setIsAccordionOpen(false);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
      {Object.entries(filters).map(([key, value]: any) =>
        value !== "all" ? (
          <BrandBadge
            variant="default"
            key={key}
            label={
              key === "rating"
                ? `${value} ⭐ & più`
                : typeof value === "object"
                  ? value.name || `${value.unitValue} ${value.unitOfMeasure}`
                  : key.charAt(0).toUpperCase() + key.slice(1) + `: ${value}`
            }
          />
        ) : null
      )}

      {Object.keys(filters).length > 0 && (
        <BrandButton
          onClick={() => onResetFilter()} // ✅ Chiama la funzione di reset dal padre
        >
          🔄 Reset
        </BrandButton>
      )}
    </div>
  );
};

export default ActiveFilters;
