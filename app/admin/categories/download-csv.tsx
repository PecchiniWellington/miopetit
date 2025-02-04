"use client";

import { formatDateTime, formatId } from "@/lib/utils";
import Papa from "papaparse";

const DownloadCSV = ({ categories }: { categories: any }) => {
  const downloadCSV = () => {
    if (!categories || categories.length === 0) {
      alert("No categories available to download.");
      return;
    }

    const csvData = categories.map((category: any) => ({
      ID: formatId(category.id),
      Name: category.name,
      Slug: category.slug || "N/A",
      Created_At: formatDateTime(category.createdAt).dateTime,
      Updated_At: formatDateTime(category.updatedAt).dateTime,
      Description: category.description || "N/A",
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.setAttribute("href", url);
    link.setAttribute("download", "categories.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={downloadCSV}
      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
    >
      Download CSV
    </button>
  );
};

export default DownloadCSV;
