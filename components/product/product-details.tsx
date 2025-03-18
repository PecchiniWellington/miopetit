"use client";

import { IProduct } from "@/core/validators";
import { BadgeCheck } from "lucide-react";
import BrandBadge from "../shared/brand-components/brand-badge";
import BrandCard from "../shared/brand-components/brand-card";
import Rating from "./rating";

export default function ProductDetails({
  product,
}: {
  product: IProduct | null;
}) {
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

  const extractProductData = product
    ? [
        {
          key: "Funzione alimentare",
          value: product.productFeature
            .map((p: { name: string }) => p.name)
            .join(", "),
        },
        {
          key: "Patologie supportate",
          value: product.productPathologies
            .map((p: { name: string }) => p.name)
            .join(", "),
        },
        {
          key: "Proteine principali",
          value: product.productProteins
            .map((p: { name: string }) => p.name)
            .join(", "),
        },
        { key: "Età animale", value: product.animalAge },
      ]
    : [];

  return product ? (
    <>
      <div className="col-span-2 px-6">
        {/* Punti fedeltà */}
        <div className="flex items-center gap-2 text-sm font-medium text-yellow-600">
          <BrandBadge
            variant="warning"
            className="bg-yellow-300 px-3 py-1 text-black"
            icon={<BadgeCheck className="mr-2 inline-block size-4" />}
            label="52 PUNTI"
          />
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
            <Rating value={Number(product.rating)} />
          </div>
          <span className="text-sm text-gray-600">
            {product.numReviews} recensioni{" "}
          </span>
        </div>

        {/* Prezzo */}
        <div className="mt-4 border-t pt-4">
          <p className="text-lg font-medium text-gray-600">Ordine singolo:</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-black">
              {(
                Number(product.price) -
                Number(product.price) *
                  (Number(product.percentageDiscount) / 100)
              ).toFixed(2)}
            </span>
            <span className="text-gray-500 line-through">{product.price}</span>
            <span
              className={`${product.percentageDiscount ? "block" : "hidden"} font-bold text-red-400`}
            >
              - {Number(product.percentageDiscount)}% SCONTO
            </span>
            {/* CREARE SCONTO in db */}
          </div>
        </div>

        {/* Punti fedeltà */}

        {/* Specifiche prodotto */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Specifiche prodotto</h2>
          <BrandCard>
            <table className="w-full border-collapse text-sm">
              <tbody>
                {extractProductData.map((p) => (
                  <tr key={p.key} className="border-t last:border-b">
                    <td className="bg-gray-100 px-4 py-2 text-gray-700">
                      {p.key}
                    </td>
                    <td className="px-4 py-2 text-black">{p.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </BrandCard>
        </div>
      </div>
    </>
  ) : (
    <div>NO DETAILS AVAILABLE</div>
  );
}
