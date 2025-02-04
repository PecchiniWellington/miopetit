"use client";

import CSVTable from "@/components/CSVTable";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Alert } from "@/components/ui/alert";
import Link from "next/link";
import Papa from "papaparse";
import { PRODUCT_DEFAULT_VALUES } from "@/lib/constants";

export default function UploadFiles() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [tableData, setTableData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [urlPath, setUrlPath] = useState("categories");
  const [formattedData, setFormattedData] = useState<any[]>([]);

  // Gestisce il cambio del path in base alla selezione
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setUrlPath(selectedValue);
  };

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

      let formattedData = data.map((item: any) => ({
        /*    ...PRODUCT_DEFAULT_VALUES, */
        ...item,
      }));

      switch (urlPath) {
        case "categories":
          try {
            const responseCategory = await fetch(`/api/categories/upload`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(formattedData),
            });

            if (!responseCategory.ok) {
              const errorText = await responseCategory.text();
              const errorData = errorText ? JSON.parse(errorText) : {};
              throw new Error(errorData.message || "Failed to upload data.");
            }
          } catch (error) {
            console.log("Error:", error);
            setErrorMessage(error.message);
          }
          break;
        case "products":
          try {
            const response = await fetch(`/api/products/upload`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(formattedData),
            });

            if (!response.ok) {
              const errorText = await response.text();
              const errorData = errorText ? JSON.parse(errorText) : {};
              throw new Error(errorData.message || "Failed to upload data.");
            }
          } catch (error) {
            console.log("Error:", error);
            setErrorMessage(error.message);
          }
          break;
        case "users":
          try {
            const response = await fetch(`/api/users/upload`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(formattedData),
            });

            if (!response.ok) {
              const errorText = await response.text();
              const errorData = errorText ? JSON.parse(errorText) : {};
              throw new Error(errorData.message || "Failed to upload data.");
            }
          } catch (error) {
            console.log("Error:", error);
            setErrorMessage(error.message);
          }
          break;
        default:
          setFormattedData([]);
      }

      setSuccess(true);
    } catch (error: any) {
      console.error("Upload Error:", error);
      setErrorMessage(error.message || "Error uploading data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-semibold mb-6">Upload Your Files</h1>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Select Data Type
        </label>
        <select
          onChange={handleSelectChange}
          className="w-full p-2 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="categories">Categories</option>
          <option value="products">Products</option>
          <option value="users">Users</option>
        </select>
      </div>

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
    </>
  );
}
