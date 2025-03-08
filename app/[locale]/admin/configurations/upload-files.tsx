"use client";

import SearchSelect from "@/components/shared/selects/search-select";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Papa from "papaparse";
import { useRef, useState } from "react";

export default function UploadFiles() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [urlPath, setUrlPath] = useState("categories");

  // Gestisce il cambio del path in base alla selezione
  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
    setUrlPath(value);
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

      switch (urlPath) {
        case "categories":
          try {
            const responseCategory = await fetch(`/api/upload/categories`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ data }),
            });

            if (!responseCategory.ok) {
              const errorText = await responseCategory.text();
              const errorData = errorText ? JSON.parse(errorText) : {};
              throw new Error(errorData.message || "Failed to upload data.");
            }
          } catch (error) {
            console.error("Errore durante l'upload:", error);
            if (error instanceof Error) {
              setErrorMessage(error.message);
            } else {
              setErrorMessage("An unknown error occurred.");
            }
          }
          break;
        case "products":
          try {
            const response = await fetch(`/api/upload/products`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            });

            if (!response.ok) {
              const errorText = await response.text();
              const errorData = errorText ? JSON.parse(errorText) : {};
              throw new Error(errorData.message || "Failed to upload data.");
            }
          } catch (error) {
            console.error("Errore durante l'upload:", error);
            if (error instanceof Error) {
              setErrorMessage(error.message);
            } else {
              setErrorMessage("An unknown error occurred.");
            }
          }
          break;
        case "users":
          try {
            const response = await fetch(`/api/upload/users`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            });

            if (!response.ok) {
              const errorText = await response.text();
              const errorData = errorText ? JSON.parse(errorText) : {};
              throw new Error(errorData.message || "Failed to upload data.");
            }
          } catch (error) {
            console.error("Errore durante l'upload:", error);
            if (error instanceof Error) {
              setErrorMessage(error.message);
            } else {
              setErrorMessage("An unknown error occurred.");
            }
          }
          break;
        case "orders":
          try {
            const response = await fetch(`/api/upload/orders`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            });

            if (!response.ok) {
              const errorText = await response.text();
              const errorData = errorText ? JSON.parse(errorText) : {};
              throw new Error(errorData.message || "Failed to upload data.");
            }
          } catch (error) {
            console.error("Errore durante l'upload:", error);
            if (error instanceof Error) {
              setErrorMessage(error.message);
            } else {
              setErrorMessage("An unknown error occurred.");
            }
          }
          break;
        default:
          return [];
      }

      setSuccess(true);
      setCsvFile(null); // Reset the file input
      if (inputFileRef.current) {
        inputFileRef.current.value = ""; // Clear the file input value
      }
    } catch (error) {
      console.error("Errore durante l'upload:", error);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-4">
        <div className="block text-sm font-medium text-gray-700">
          Select Data Type
        </div>
        <SearchSelect
          value={"categories"}
          options={[
            { label: "Category", value: "categories" },
            { label: "Products", value: "products" },
            { label: "Users", value: "users" },
            { label: "Orders", value: "orders" },
          ]}
          onSelect={(e) => handleSelectChange(e)}
          placeholder="Choose an option"
        />
      </div>

      <div className="mb-4">
        <Input
          type="file"
          accept=".csv"
          ref={inputFileRef}
          onChange={handleFileUpload}
          className={` w-full rounded-lg border border-slate-700 bg-transparent  p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
