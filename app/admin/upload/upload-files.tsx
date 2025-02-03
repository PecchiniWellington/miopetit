"use client";

import CSVTable from "@/components/CSVTable";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button"; // Bottone per l'upload
import { Input } from "@/components/ui/input"; // Input per la selezione file
import { Progress } from "@/components/ui/progress"; // Barra di progresso
import { Alert } from "@/components/ui/alert"; // Alert per messaggi
import Link from "next/link";

export default function FileUploadPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blobs, setBlobs] = useState<any[]>([]); // Array per i file caricati
  const [uploadProgress, setUploadProgress] = useState(0); // Per gestire la barra di progresso
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Per gestire gli errori

  const handleFileUpload = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage(null); // Reset dell'errore prima di un nuovo tentativo

    if (!inputFileRef.current?.files) {
      setErrorMessage("No files selected.");
      return;
    }

    const files = Array.from(inputFileRef.current.files);
    const uploadedBlobs: any[] = [];

    try {
      for (const file of files) {
        const responseFile = await fetch(
          `/api/avatar/upload?filename=${file.name}`,
          {
            method: "POST",
            body: file,
          }
        );

        if (!responseFile.ok) {
          throw new Error(`Failed to upload ${file.name}`);
        }

        const newBlob = await responseFile.json();
        uploadedBlobs.push(newBlob);
        setUploadProgress((prev) => Math.min(prev + 100 / files.length, 100)); // Progressivo aggiornamento della barra di progresso
      }

      setBlobs(uploadedBlobs); // Aggiorna con i blob caricati
      setUploadProgress(0); // Reset della barra di progresso dopo il caricamento
    } catch (error: any) {
      setErrorMessage(error.message || "An error occurred during upload.");
      setUploadProgress(0);
    }
  };

  const isCSV = (file: any) => {
    return file.url.endsWith(".csv");
  };

  return (
    <>
      <h1 className="text-3xl font-semibold mb-6">Upload Your Files</h1>

      <form onSubmit={handleFileUpload} className="mb-4">
        <div className="flex flex-col gap-4">
          <Input
            name="files"
            ref={inputFileRef}
            type="file"
            required
            multiple
            className="w-full p-3 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Upload Files
          </Button>
        </div>
      </form>

      {errorMessage && (
        <Alert variant="destructive" className="mb-4">
          {errorMessage}
        </Alert>
      )}

      {uploadProgress > 0 && (
        <div className="mb-4">
          <p>Caricamento in corso...</p>
          <Progress value={uploadProgress} max={100} />
        </div>
      )}

      {blobs.length > 0 && (
        <div className="mt-6">
          {blobs.map((blob, index) => {
            if (isCSV(blob)) {
              return (
                <div
                  key={index}
                  className="mb-6 p-4 border rounded-lg bg-gray-50 shadow-md"
                >
                  <p>
                    CSV URL:{" "}
                    <a href={blob.url} className="text-blue-500">
                      {blob.url}
                    </a>
                  </p>
                  <Button className="mt-2 bg-green-600 text-white hover:bg-green-700">
                    <Link href={blob.url} download>
                      Download CSV
                    </Link>
                  </Button>
                  <CSVTable CSV_URL={blob.url} />
                </div>
              );
            }
            return null;
          })}
        </div>
      )}
    </>
  );
}
