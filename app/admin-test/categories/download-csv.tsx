"use client";

import Papa from "papaparse";

const DownloadCSV = ({ csvData }: any) => {
  const downloadCSV = () => {
    if (!csvData || csvData.length === 0) {
      alert("No data available to download.");
      return;
    }

    const csv = Papa.unparse(csvData);
    console.log("SUCA", csv);
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
