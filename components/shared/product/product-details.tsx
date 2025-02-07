"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BadgeCheck, Star } from "lucide-react";

export default function ProductDetails() {
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
      <h3 className="mt-4 text-sm uppercase text-gray-500">HILLS</h3>

      {/* Titolo del prodotto */}
      <h1 className="mt-1 text-2xl font-bold text-black">
        Hill&apos;s Science Plan Hypoallergenic Adult Small&Mini alimento secco
        per cani al Salmone
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
          <span className="text-2xl font-bold text-black">€52,19</span>
          <span className="text-gray-500 line-through">€57,99</span>
        </div>
        <p className="text-xs text-gray-500">(€8,70/KG)</p>
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
