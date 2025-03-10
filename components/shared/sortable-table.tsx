"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowUp, XCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { JSX } from "react";

interface SortableTableProps<T> {
  columns: { key: keyof T; label: string }[];
  data: T[];
  renderRow: (row: T) => JSX.Element;
}

const SortableTable = <T,>({
  columns,
  data,
  renderRow,
}: SortableTableProps<T>) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sortKey = searchParams.get("sortKey") || "";
  const sortOrder = searchParams.get("sortOrder") || "asc"; // Default ASC

  // Funzione per cambiare ordinamento
  const handleSort = (key: string) => {
    const newOrder = sortKey === key && sortOrder === "asc" ? "desc" : "asc";
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortKey", key);
    params.set("sortOrder", newOrder);
    router.push(`?${params.toString()}`);
  };

  // Funzione per resettare il sort
  const resetSort = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("sortKey");
    params.delete("sortOrder");
    router.push(`?${params.toString()}`);
  };

  console.log("DAta", data);
  // Ordina i dati in base alla colonna e all'ordine attuale
  const sortedData = [...data].sort((a, b) => {
    const valueA = a[sortKey as keyof T];
    const valueB = b[sortKey as keyof T];

    if (typeof valueA === "number" && typeof valueB === "number") {
      return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
    }
    if (typeof valueA === "string" && typeof valueB === "string") {
      return sortOrder === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }
    return 0;
  });

  return (
    <div>
      {/* Animazione per il box di reset del sort */}
      <AnimatePresence>
        {sortKey && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="mb-4 flex items-center justify-between rounded-md bg-gray-800 p-3 text-white shadow-md"
          >
            <span className="text-sm">
              Ordinamento attivo: <strong>{sortKey.toUpperCase()}</strong> (
              {sortOrder === "asc" ? "Ascendente" : "Discendente"})
            </span>
            <button
              onClick={resetSort}
              className="flex items-center gap-1 rounded-md bg-red-600 px-3 py-1 text-sm font-medium text-white transition-all hover:bg-red-700"
            >
              <XCircle size={16} /> Reset Sort
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tabella */}
      <table className="min-w-full divide-y divide-gray-700">
        <thead>
          <tr>
            {columns.map(({ key, label }) => (
              <th
                key={key as string}
                className={`cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider transition-all duration-200 hover:text-gray-200 ${
                  sortKey === key ? "text-purple-400" : "text-gray-400"
                }`}
                onClick={() => handleSort(key as string)}
              >
                {label}{" "}
                {sortKey === key && (
                  <span className="ml-1 inline-block">
                    {sortOrder === "asc" ? (
                      <ArrowUp size={14} />
                    ) : (
                      <ArrowDown size={14} />
                    )}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {sortedData.map(renderRow)}
        </tbody>
      </table>
    </div>
  );
};

export default SortableTable;
