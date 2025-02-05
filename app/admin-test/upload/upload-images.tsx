"use client";

import { Alert } from "@/components/ui/alert"; // Alert per messaggi
import { Button } from "@/components/ui/button"; // Bottone per l'upload
import { Input } from "@/components/ui/input"; // Input per la selezione file
import { Progress } from "@/components/ui/progress"; // Barra di progresso
import Image from "next/image";
import { useRef, useState } from "react";

export default function UploadImage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blobs, setBlobs] = useState<{ url: string }[]>([]); // Array per i file caricati
  const [uploadProgress, setUploadProgress] = useState(0); // Per gestire la barra di progresso
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Per gestire gli errori

  const handleFileUpload = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage(null); // Reset dell'errore prima di un nuovo tentativo

    if (!inputFileRef.current?.files) {
      setErrorMessage("Drag and drop files here or click to upload.");
      return;
    }

    const files = Array.from(inputFileRef.current.files);
    const uploadedBlobs: { url: string }[] = [];

    try {
      for (const file of files) {
        const responseImage = await fetch(
          `/api/avatar/upload?filename=${file.name}`,
          {
            method: "POST",
            body: file,
          }
        );

        if (!responseImage.ok) {
          throw new Error(`Failed to upload ${file.name}`);
        }

        const newBlob = await responseImage.json();
        uploadedBlobs.push({ url: newBlob });
        setUploadProgress((prev) => Math.min(prev + 100 / files.length, 100)); // Progressivo aggiornamento della barra di progresso
      }

      setBlobs(uploadedBlobs); // Aggiorna con i blob caricati
      setUploadProgress(0); // Reset della barra di progresso dopo il caricamento
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message || "An error occurred during upload.");
        setUploadProgress(0);
      }
    }
  };

  const isImage = (file: { url: string }) => {
    return file.url.match(/\.(jpeg|jpg|gif|png|bmp|webp)$/i) !== null;
  };

  return (
    <>
      <h1 className="mb-6 text-3xl font-semibold">Upload Your Images</h1>

      <form onSubmit={handleFileUpload} className="mb-4">
        <div className="flex flex-col gap-4">
          <Input
            name="files"
            ref={inputFileRef}
            type="file"
            required
            multiple
            className="min-h-48 w-full rounded-lg border bg-white p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            type="submit"
            className="w-32 rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700"
          >
            Upload Images
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
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {blobs.map((blob, index) => {
            if (isImage(blob)) {
              return (
                <div
                  key={index}
                  className="rounded-lg border bg-gray-50 p-4 shadow-md"
                >
                  <p className="text-sm text-gray-600">
                    Image URL:{" "}
                    <a href={blob.url} className="text-blue-500">
                      {blob.url}
                    </a>
                  </p>
                  <Image
                    height={200}
                    width={200}
                    src={blob.url}
                    alt={`Uploaded file ${index}`}
                    className="mt-2 h-auto w-full rounded-lg shadow-lg"
                  />
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
