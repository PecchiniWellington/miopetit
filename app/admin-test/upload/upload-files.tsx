"use client";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatCategoriesData } from "@/lib/utils";
import Papa from "papaparse";
import { useRef, useState } from "react";

export default function UploadFiles() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [urlPath, setUrlPath] = useState("categories");
  const [, setFormattedData] = useState<any[]>([]);

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

      const formattedData = data.map((item: any) => ({
        ...item,
        categoryId: item.categoryId || "d0380863-516c-4fda-9ddf-818252b7916f",
      }));

      switch (urlPath) {
        case "categories":
          try {
            const data = formatCategoriesData(formattedData);
            const responseCategory = await fetch(`/api/upload/categories`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ data: formattedData }),
            });

            if (!responseCategory.ok) {
              const errorText = await responseCategory.text();
              const errorData = errorText ? JSON.parse(errorText) : {};
              throw new Error(errorData.message || "Failed to upload data.");
            }
          } catch (error) {
            console.error("Errore durante l'upload:", error);
            setErrorMessage(error.message);
          }
          break;
        case "products":
          try {
            const response = await fetch(`/api/upload/products`, {
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
            const response = await fetch(`/api/upload/users`, {
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
        case "orders":
          try {
            const response = await fetch(`/api/upload/orders`, {
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
      setCsvFile(null); // Reset the file input
      if (inputFileRef.current) {
        inputFileRef.current.value = ""; // Clear the file input value
      }
    } catch (error: any) {
      console.error("Upload Error:", error);
      setErrorMessage(error.message || "Error uploading data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="mb-6 text-3xl font-semibold">Upload Your Files</h1>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Select Data Type
        </label>
        <select
          onChange={handleSelectChange}
          className="w-full rounded-lg border bg-white p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="categories">Categories</option>
          <option value="products">Products</option>
          <option value="users">Users</option>
          <option value="orders">Orders</option>
        </select>
      </div>

      <div className="mb-4">
        <Input
          type="file"
          accept=".csv"
          ref={inputFileRef}
          onChange={handleFileUpload}
          className="w-full rounded-lg border bg-white p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button
          onClick={uploadOnDb}
          disabled={!csvFile || loading}
          className="mt-2 w-full rounded-lg bg-yellow-600 py-2 text-white hover:bg-yellow-700"
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
