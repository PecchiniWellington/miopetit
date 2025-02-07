"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Papa from "papaparse";
import { useEffect, useState } from "react";

export default function CSVTable({ CSV_URL }: { CSV_URL: string }) {
  const [data, setData] = useState<string[][]>([]);
  const [searchName, setSearchName] = useState("");
  const [searchId, setSearchId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Puoi cambiare il numero di elementi per pagina

  useEffect(() => {
    fetch(CSV_URL)
      .then((response) => response.text())
      .then((csvText) => {
        const parsedData = Papa.parse(csvText, { skipEmptyLines: true })
          .data as string[][];
        setData(parsedData);
      });
  }, [CSV_URL]);

  if (data.length === 0) return <p>Caricamento dati...</p>;

  // Ottieni intestazioni
  const headers = data[0];

  // Funzione per filtrare per nome
  const filteredDataByName = data.slice(1)?.filter(
    (row) => row[0].toLowerCase().includes(searchName.toLowerCase()) // Modifica l'indice se il nome non è nella colonna 0
  );

  // Funzione per filtrare per ID
  const filteredDataById = filteredDataByName?.filter(
    (row) => row[1].toLowerCase().includes(searchId.toLowerCase()) // Modifica l'indice se l'ID non è nella colonna 1
  );

  // Calcolo l'indice di inizio e fine per la paginazione
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDataById.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Funzioni di navigazione paginazione
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Totale delle pagine
  const totalPages = Math.ceil(filteredDataById.length / itemsPerPage);

  // URL base per le immagini caricate su Vercel Blob
  const baseUrl = "https://rqtqmmtupkjdpvpv.public.blob.vercel-storage.com";

  // Funzione per costruire l'URL completo dell'immagine (usando nome base e l'ID univoco)
  const getImageUrl = (baseName: string) => {
    // Supponiamo che tu abbia una logica per trovare l'ID univoco corrispondente
    // Ad esempio, supponiamo che tu conosca l'ID univoco (questo va adattato alle tue necessità)
    const uniqueId = "ncfWrev8QWTZfTYGKqwJ7dvDtCil6w"; // Esempio di ID univoco
    return `${baseUrl}/${baseName}-${uniqueId}.webp`;
  };

  // Funzione per determinare se la cella è un'immagine
  const isImage = (url: string) => url.startsWith("/");

  return (
    <div className="w-full overflow-x-auto">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Cerca per nome"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="mr-2 border p-2"
        />
        <input
          type="text"
          placeholder="Cerca per ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="border p-2"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={index}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, cellIndex) => {
                // Se la cella contiene un'immagine, renderizzala
                if (isImage(cell)) {
                  // Supponiamo che il nome base dell'immagine sia nella prima colonna
                  const baseName = row[0];
                  const fullImageUrl = getImageUrl(baseName); // Usa il nome base per ottenere l'URL
                  return (
                    <TableCell key={cellIndex}>
                      <img src={fullImageUrl} alt="image" className="size-16" />
                    </TableCell>
                  );
                }

                // Altrimenti, semplicemente mostra il valore della cella
                return <TableCell key={cellIndex}>{cell}</TableCell>;
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="pagination mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="mr-2 rounded bg-gray-200 px-4 py-2"
        >
          Precedente
        </button>
        <span>
          {currentPage} di {totalPages}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="ml-2 rounded bg-gray-200 px-4 py-2"
        >
          Successivo
        </button>
      </div>
    </div>
  );
}
