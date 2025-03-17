"use client";

import Papa from "papaparse";
import BrandButton from "./brand-components/brand-button";

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

  return <BrandButton onClick={() => downloadCSV()}>Download CSV</BrandButton>;
};

export default DownloadCSV;
