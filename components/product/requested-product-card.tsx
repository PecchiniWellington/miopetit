import { Button } from "@react-email/components";
import { Badge } from "lucide-react";
import Image from "next/image";
import { ProgressBar } from "../progress-bar";

interface RequestedProductCardProps {
  id: string;
  name: string;
  image?: string;
  description?: string;
  fundedAmount: number;
  targetAmount: number;
  progressPercentage: number;
  status: "PENDING" | "FUNDED" | "DELIVERED";
  onDonateClick?: (id: string) => void;
}

export default function RequestedProductCard({
  id,
  name,
  image,
  description,
  fundedAmount,
  targetAmount,
  progressPercentage,
  status,
  onDonateClick,
}: RequestedProductCardProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-md">
      {image && (
        <Image
          width={300}
          height={200}
          src={image}
          alt={name}
          className="h-48 w-full rounded-xl object-cover"
        />
      )}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">{name}</h2>
        <Badge>{status}</Badge>
      </div>
      <p className="min-h-[40px] text-sm text-gray-600">{description}</p>
      <div>
        <ProgressBar value={progressPercentage} />
        <p className="mt-1 text-xs text-gray-500">
          {fundedAmount.toFixed(2)}€ raccolti su {targetAmount.toFixed(2)}€
        </p>
      </div>
      {status !== "DELIVERED" && (
        <Button onClick={() => onDonateClick?.(id)} className="mt-2 w-full">
          Dona ora
        </Button>
      )}
      {status === "DELIVERED" && (
        <p className="mt-2 text-center text-sm font-medium text-green-600">
          Consegnato al canile 🎉
        </p>
      )}
    </div>
  );
}
