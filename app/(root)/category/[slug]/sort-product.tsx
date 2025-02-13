"use client";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const sortOrders = ["newest", "lowest", "highest", "rating"];

const SortProduct = ({
  sort,
  slug,
  className,
}: {
  sort: string;
  slug: string;
  className: string;
}) => {
  const [isSortOpen, setIsSortOpen] = useState(false);

  const getFilterUrl = ({ s }: { s?: string }) => {
    const params = { sort };
    if (s) params.sort = s;

    return `/category/${slug}?${new URLSearchParams(params).toString()}`;
  };

  return (
    <div className={`relative z-20 ${className}`}>
      <Button
        onClick={() => setIsSortOpen(!isSortOpen)}
        className="flex w-full items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-100"
      >
        <span className="font-bold text-primary-500">
          {sort || "Ordina per:"}
        </span>{" "}
        <ChevronDown size={16} />
      </Button>

      {isSortOpen && (
        <ul className="absolute right-0 mt-2 w-40 rounded-lg border bg-white shadow-md">
          {sortOrders.map((sortOrder) => (
            <li key={sortOrder} className="border-b last:border-none">
              <Link
                onClick={() => setIsSortOpen(false)}
                href={getFilterUrl({ s: sortOrder })}
                className={`block px-4 py-2 text-sm hover:bg-gray-100 ${
                  sort === sortOrder && "font-bold text-primary-500"
                }`}
              >
                {sortOrder}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SortProduct;
