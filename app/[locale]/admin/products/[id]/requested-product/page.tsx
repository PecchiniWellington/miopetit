import BrandBadge from "@/components/shared/brand-components/brand-badge";
import { prisma } from "@/core/prisma/prisma";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import { notFound } from "next/navigation";
import "react-circular-progressbar/dist/styles.css";
import CircularProgress from "./circular-progress-bar";

export default async function RequestedProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const requestedProduct = await prisma.requestedProduct.findUnique({
    where: { id: (await params).id },
    include: {
      contributor: {
        select: {
          id: true,
          name: true,
          type: true,
        },
      },
    },
  });

  if (!requestedProduct) return notFound();

  const percentage =
    requestedProduct.targetAmount > 0
      ? Math.min(
          (requestedProduct.fundedAmount / requestedProduct.targetAmount) * 100,
          100
        )
      : 0;

  return (
    <div className="relative z-10 flex-1 overflow-auto">
      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="space-y-6 rounded-xl border border-gray-700 bg-gray-800 p-6 text-gray-100 shadow-lg">
          <div className="flex items-center gap-6">
            <Image
              src={requestedProduct.image || "/images/placeholder.jpg"}
              alt={requestedProduct.name}
              width={80}
              height={80}
              className="rounded-lg border border-gray-600"
            />
            <div>
              <h2 className="text-2xl font-semibold">
                {requestedProduct.name}
              </h2>
              <p className="text-sm text-gray-400">
                ID: <span className="font-mono">{requestedProduct.id}</span>
              </p>
            </div>
            <div className="ml-auto">
              <BrandBadge
                label={requestedProduct.status}
                variant={
                  requestedProduct.status === "PENDING"
                    ? "warning"
                    : requestedProduct.status === "FUNDED"
                      ? "success"
                      : "info"
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <DetailRow label="Quantity" value={requestedProduct.quantity} />
            <DetailRow
              label="Price"
              value={`€${requestedProduct.price.toFixed(2)}`}
            />
            <DetailRow
              label="Funded Amount"
              value={`€${requestedProduct.fundedAmount.toFixed(2)}`}
            />
            <DetailRow
              label="Target Amount"
              value={`€${requestedProduct.targetAmount.toFixed(2)}`}
            />
            <DetailRow
              label="Created At"
              value={
                formatDateTime(requestedProduct.createdAt.toISOString())
                  .dateTime
              }
            />
            <DetailRow
              label="Base Product ID"
              value={requestedProduct.baseProductId ?? "—"}
            />
          </div>

          <div className="flex justify-center py-6">
            <CircularProgress value={percentage} />
          </div>

          <div className="mt-4">
            <h3 className="mb-1 text-sm text-gray-400">Notes</h3>
            <p className="text-gray-200">{requestedProduct.notes || "—"}</p>
          </div>

          <div className="mt-6 border-t border-gray-700 pt-4">
            <h3 className="mb-1 text-sm text-gray-400">Contributor</h3>
            <p className="text-gray-200">
              {requestedProduct.contributor.name} (
              {requestedProduct.contributor.type})
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="text-sm">
      <p className="text-gray-400">{label}</p>
      <p className="font-medium text-gray-100">{value}</p>
    </div>
  );
}
