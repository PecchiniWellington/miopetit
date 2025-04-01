"use client";

import { IContributor } from "@/core/validators/contributors.validator";
import { motion } from "framer-motion";
import { Info, Share2 } from "lucide-react";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { toast } from "sonner";
import DonateModal from "../shared/modals/donate-modal";

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(() => {
    toast.success("🔗 Link copiato negli appunti!");
  });
};

const shareToSocial = (
  platform: "facebook" | "whatsapp" | "instagram",
  url: string,
  text: string
) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);

  let shareUrl = "";
  switch (platform) {
    case "facebook":
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
      break;
    case "whatsapp":
      shareUrl = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
      break;
    case "instagram":
      shareUrl = `https://www.instagram.com/share?url=${encodedUrl}&text=${encodedText}`;
      break;
  }

  window.open(shareUrl, "_blank");
};

type RequestedProductDisplay = {
  id: string;
  name: string;
  image?: string;
  fundedAmount: number;
  targetAmount: number;
  status: "PENDING" | "FUNDED" | "DELIVERED";
  notes?: string;
  quantity?: number;
  contributor: {
    id: string;
    name: string;
    slug: string;
    type: "SHELTER" | "ASSOCIATION" | "RETAILER";
  };
  baseProduct?: {
    id?: string;
    slug?: string;
    description?: string;
    images?: string[];
    productBrand?: { name: string };
  };
};

export default function ProductDonationCard({
  product,
  contributor,
}: {
  product: RequestedProductDisplay;
  contributor?: IContributor;
}) {
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const percentage = Math.floor(Math.random() * 101);
  const gradientId = `gradient-${product.id}`;
  const locale = useLocale();

  const badge =
    product.status === "FUNDED"
      ? { label: "💚 Completato", color: "bg-green-100 text-green-700" }
      : percentage > 75
        ? { label: "🚀 Quasi fatto!", color: "bg-yellow-100 text-yellow-700" }
        : percentage < 30
          ? { label: "🔥 Urgente", color: "bg-red-100 text-red-700" }
          : null;

  const shareUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/donazioni/${product.id}`;
  const shareText = `Aiutami a donare per ${product.name}! 💚`;

  console.log("contributor", contributor, product);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative flex flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-md hover:shadow-lg"
    >
      {badge && (
        <div
          className={`absolute left-2 top-2 z-10 rounded-full border border-white px-3 py-1 text-xs font-semibold ${badge.color}`}
        >
          {badge.label}
        </div>
      )}

      <div className="group relative h-48 w-full overflow-hidden rounded-xl">
        <Image
          src={product.baseProduct?.images?.[0] ?? "/images/placeholder.jpg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <h2 className="line-clamp-2 text-center text-base font-semibold text-gray-800">
        {product.name}
      </h2>

      <div className="flex items-center justify-center">
        <div className="size-20">
          <svg style={{ height: 0 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f87171" />
                <stop offset="33%" stopColor="#facc15" />
                <stop offset="66%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>
            </defs>
          </svg>

          <CircularProgressbarWithChildren
            value={percentage}
            styles={buildStyles({
              pathColor: `url(#${gradientId})`,
              trailColor: "#E5E7EB",
              strokeLinecap: "round",
            })}
          >
            <div className="text-sm font-bold text-gray-700">{percentage}%</div>
          </CircularProgressbarWithChildren>
        </div>
      </div>

      <p className="text-center text-sm text-gray-600">
        {product.fundedAmount.toFixed(2)}€ su {product.targetAmount.toFixed(2)}€
      </p>

      {contributor?.city && (
        <div className="text-center text-xs text-gray-500">
          🏠 {contributor.name} - {contributor.city}, {contributor.region}
        </div>
      )}

      {product.notes && (
        <p className="text-center text-xs italic text-gray-500">
          📝 {product.notes}
        </p>
      )}

      {product.quantity && (
        <p className="text-center text-xs text-gray-500">
          Quantità richiesta:{" "}
          <span className="font-medium">{product.quantity}</span>
        </p>
      )}

      {product.baseProduct?.description && (
        <p className="text-center text-xs text-gray-500">
          ℹ️ {product.baseProduct.description}
        </p>
      )}

      <div className="flex flex-col gap-3">
        {product.baseProduct?.slug && (
          <Link
            href={`/${locale}/product/${product.baseProduct?.slug}?from=shelter/${contributor?.slug}/shop`}
            className="flex items-center justify-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <Info className="size-4" /> Dettaglio prodotto
          </Link>
        )}

        <div className="flex items-center justify-center gap-3 pt-1">
          <button
            onClick={() => shareToSocial("facebook", shareUrl, shareText)}
            className="rounded-full p-2 text-blue-600 transition hover:bg-blue-50"
            title="Condividi su Facebook"
          >
            <FaFacebook className="size-5" />
          </button>
          <button
            onClick={() => shareToSocial("whatsapp", shareUrl, shareText)}
            className="rounded-full p-2 text-green-500 transition hover:bg-green-50"
            title="Condividi su WhatsApp"
          >
            <FaWhatsapp className="size-5" />
          </button>
          <button
            onClick={() => shareToSocial("instagram", shareUrl, shareText)}
            className="rounded-full p-2 text-pink-500 transition hover:bg-pink-50"
            title="Condividi su Instagram"
          >
            <FaInstagram className="size-5" />
          </button>
          <button
            onClick={() => copyToClipboard(shareUrl)}
            className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100"
            title="Copia link"
          >
            <Share2 className="size-5" />
          </button>
        </div>

        {product.status === "FUNDED" ? (
          <div className="text-center text-sm font-medium text-green-600">
            Obiettivo raggiunto 🎉
          </div>
        ) : (
          <DonateModal
            productName={contributor?.name || product.name}
            onDonate={(amount) => {
              console.log(`Donato ${amount}€ per ${product.name}`);
              setIsDonateOpen(false);
            }}
          />
        )}
      </div>
    </motion.div>
  );
}
