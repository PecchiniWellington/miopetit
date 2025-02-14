"use client";

import { BadgeStatus } from "@/components/shared/badge-status";
import { STATUS } from "@/lib/constants";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

const ActiveFilters = ({ slug }: { slug: string }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Estrai i filtri dall'URL
  const filters = Object.fromEntries(searchParams.entries());

  // Mappa degli stati per i filtri
  const filterStatusMap: { [key: string]: string } = {
    q: STATUS.PRIMARY,
    category: STATUS.SUCCESS,
    price: STATUS.WARNING,
    rating: STATUS.DEFAULT,
  };

  // Funzione per rimuovere un filtro specifico mantenendo gli altri
  const getUpdatedFilterUrl = (paramToRemove: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(paramToRemove);

    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
      {Object.entries(filters).map(([key, value]) =>
        value !== "all" ? (
          <BadgeStatus
            key={key}
            status={filterStatusMap[key] || STATUS.DEFAULT}
          >
            {key === "rating" ? `${value} ⭐ & più` : value}

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
        <Button className="flex items-center gap-2 rounded-full border border-purple-500 bg-white px-4 py-2 text-sm font-medium text-purple-700 shadow-md transition-all hover:bg-purple-100 hover:text-purple-900">
          <Link scroll={false} href={`/${slug}`} className="flex items-center">
            🔄 Reset Filtri
          </Link>
        </Button>
      )}
    </div>
  );
};

export default ActiveFilters;
