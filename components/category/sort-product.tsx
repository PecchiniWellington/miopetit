"use client";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import BrandButton from "../shared/brand-components/brand-button";

const sortOrders = ["newest", "lowest", "highest", "rating"];

const SortProduct = ({ className }: { className: string }) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") || "newest";

  const getFilterUrl = ({ s }: { s?: string }) => {
    const params = new URLSearchParams(searchParams.toString());
    if (s) {
      params.set("sort", s);
    } else {
      params.delete("sort");
    }
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className={`relative z-20 ${className}`}>
      <BrandButton
        onClick={() => setIsSortOpen(!isSortOpen)}
        variant="flat"
        iconPosition="right"
        icon={<ChevronDown size={16} />}
      >
        <span className="font-bold capitalize text-primary-500">
          {currentSort}
        </span>
      </BrandButton>

      {isSortOpen && (
        <ul className="absolute right-0 mt-2 w-40 rounded-lg border bg-white shadow-md">
          {sortOrders.map((sortOrder) => (
            <li key={sortOrder} className="border-b last:border-none">
              <Link
                scroll={false}
                onClick={() => setIsSortOpen(false)}
                href={getFilterUrl({ s: sortOrder })}
                className={`block px-4 py-2 text-sm hover:bg-gray-100 ${
                  currentSort === sortOrder ? "font-bold text-primary-500" : ""
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
