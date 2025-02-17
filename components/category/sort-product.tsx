"use client";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const sortOrders = ["newest", "lowest", "highest", "rating"];

const SortProduct = ({
  mainCategory,
  className,
}: {
  mainCategory?: string;
  className: string;
}) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") || "newest"; // ✅ Prende il valore dall'URL

  const getFilterUrl = ({ s }: { s?: string }) => {
    const params = new URLSearchParams(searchParams.toString());
    if (s) {
      params.set("sort", s);
    } else {
      params.delete("sort");
    }
    return `/${mainCategory || ""}?${params.toString()}`;
  };

  return (
    <div className={`relative z-20 ${className}`}>
      <Button
        onClick={() => setIsSortOpen(!isSortOpen)}
        className="flex w-full items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-100"
      >
        <span className="font-bold text-primary-500">{currentSort}</span>{" "}
        <ChevronDown size={16} />
      </Button>

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
