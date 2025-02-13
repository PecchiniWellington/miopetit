"use client";

import Papa from "papaparse";

const DownloadCSV = ({ csvData }: { csvData: unknown[] }) => {
  const downloadCSV = () => {
    if (!csvData || csvData.length === 0) {
      alert("No data available to download.");
      return;
    }

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
      className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
    >
      Download CSV
    </button>
  );
};

export default DownloadCSV;
