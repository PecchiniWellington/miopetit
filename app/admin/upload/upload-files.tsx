"use client";

import CSVTable from "@/components/CSVTable";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Alert } from "@/components/ui/alert";
import Link from "next/link";
import Papa from "papaparse";

export default function UploadFiles() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedTable, setSelectedTable] = useState<string>("");
  const [tableData, setTableData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [csvFile, setCsvFile] = useState<File | null>(null);

  // Caricamento del file CSV
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setCsvFile(event.target.files[0]);
    }
  };

  // Parsing del CSV e upload al database
  const uploadOnDb = async () => {
    if (!csvFile) {
      setErrorMessage("No file selected.");
      return;
    }

    setLoading(true);
    setErrorMessage(null);
    setSuccess(false);

    try {
      const text = await csvFile.text();
      const { data } = Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
      });

      // **Mappare i dati del CSV ai campi del database**
      const formattedData = data.map((item: any) => ({
        name: item.Name, // CSV → DB
        slug: item.Slug, // CSV → DB
        description: item.Description || null, // Opzionale
        createdAt: new Date(item.Created_At), // Converte in formato Date
        updatedAt: new Date(item.Updated_At), // Converte in formato Date
      }));

      console.log("Formatted Data:", formattedData);

      const response = await fetch("/api/categories/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categories: formattedData }),
      });

      if (!response.ok) {
        throw new Error("Failed to upload categories.");
      }

      setSuccess(true);
    } catch (error: any) {
      console.error("Upload Error:", error);
      setErrorMessage(error.message || "Error uploading data.");
    } finally {
      setLoading(false);
    }
  };

  // Scaricare il CSV
  const downloadCSV = () => {
    if (!tableData.length) {
      setErrorMessage("No data available to download.");
      return;
    }

    const csv = Papa.unparse(tableData);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "categories.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <>
      <h1 className="text-3xl font-semibold mb-6">Upload Your Files</h1>

      <div className="mb-4">
        <Input
          type="file"
          accept=".csv"
          ref={inputFileRef}
          onChange={handleFileUpload}
          className="w-full p-3 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button
          onClick={uploadOnDb}
          disabled={!csvFile || loading}
          className="w-full mt-2 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
        >
          {loading ? "Uploading..." : "Start Upload"}
        </Button>
      </div>

      {errorMessage && (
        <Alert variant="destructive" className="mb-4">
          {errorMessage}
        </Alert>
      )}

      {success && (
        <Alert variant="default" className="mb-4">
          Upload successful! ✅
        </Alert>
      )}

      {tableData.length > 0 && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-100 shadow-md">
          <h2 className="text-xl font-semibold mb-2">JSON Output</h2>
          <pre className="overflow-auto p-2 bg-white border rounded-md text-sm max-h-96">
            {JSON.stringify(tableData, null, 2)}
          </pre>
        </div>
      )}

      <Button
        onClick={downloadCSV}
        className="mt-4 bg-green-600 text-white hover:bg-green-700"
      >
        Download CSV
      </Button>
    </>
  );
}
