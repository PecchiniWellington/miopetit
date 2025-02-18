"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { IProduct } from "@/core/validators";
import { BadgeCheck, Star } from "lucide-react";

export default function ProductDetails({ product }: { product: IProduct }) {
  function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
      return text;
    }
    const truncated = text.slice(0, maxLength);
    const lastSpaceIndex = truncated.lastIndexOf(" ");
    if (lastSpaceIndex === -1) {
      return truncated + "...";
    }
    return truncated.slice(0, lastSpaceIndex) + "...";
  }
  return (
    <div className="col-span-2 px-6">
      {/* Punti fedeltà */}
      <div className="flex items-center gap-2 text-sm font-medium text-yellow-600">
        <Badge variant="outline" className="bg-yellow-300 px-3 py-1 text-black">
          <BadgeCheck className="mr-2 inline-block size-4" />
          52 PUNTI
        </Badge>
      </div>

      {/* Brand */}
      <h3 className="mt-4 text-sm uppercase text-gray-500">
        {product.productBrand?.name}
      </h3>

      {/* Titolo del prodotto */}
      <h1 className="mt-1 text-2xl font-bold text-black">
        {truncateText(product.description, 100)}
      </h1>

      {/* Recensioni */}
      <div className="mt-2 flex items-center gap-2">
        <div className="flex">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <Star key={index} className="size-5 text-green-500" />
            ))}
        </div>
        <span className="text-sm text-gray-600">8 recensioni ▼</span>
      </div>

      {/* Prezzo */}
      <div className="mt-4 border-t pt-4">
        <p className="text-lg font-medium text-gray-600">Ordine singolo:</p>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-black">{product.price}</span>
          <span className="text-gray-500 line-through">
            {(
              Number(product.price) -
              Number(product.price) * (Number(product.percentageDiscount) / 100)
            ).toFixed(2)}
          </span>
          <span
            className={`${product.percentageDiscount ? "block" : "hidden"} font-bold text-red-400`}
          >
            - {Number(product.percentageDiscount)}% SCONTO
          </span>
          {/* CREARE SCONTO in db */}
        </div>
        {/*  <p className="text-xs text-gray-500">
          (€{product.productUnitFormat?.unitValue?.toString() || ""}/
          {product.productUnitFormat?.unitOfMeasure.toString() || ""})
        </p> */}
      </div>

      {/* Specifiche prodotto */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Specifiche prodotto</h2>
        <Card className="mt-3">
          <CardContent className="p-0">
            <table className="w-full border-collapse text-sm">
              <tbody>
                {[
                  ["Funzione alimentare", "Sensibilità"],
                  ["Caratteristica nutrizionale", "Grain free"],
                  ["Gusto", "Salmone"],
                  ["Lifestage", "Adulto"],
                  ["Razza", "Tutte le razze"],
                  ["Taglia", "Piccola"],
                ].map(([label, value], index) => (
                  <tr key={index} className="border-t last:border-b">
                    <td className="bg-gray-100 px-4 py-2 text-gray-700">
                      {label}
                    </td>
                    <td className="px-4 py-2 text-black">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
