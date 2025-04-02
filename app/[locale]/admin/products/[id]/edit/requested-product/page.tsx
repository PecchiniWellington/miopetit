"use server";

import Header from "@/components/admin/common/Header";
import { getAllRequestedProductById } from "@/core/actions/products/requested-products/get-all-requested-product-by-id";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { notFound } from "next/navigation";
import CircularProgress from "../../requested-product/circular-progress-bar";
import RequestedProductActions from "./config-request-product";

const RequestedProductPage = async ({ params }: { params: { id: string } }) => {
  const requestedProduct = await getAllRequestedProductById(params.id);

  if (!requestedProduct) return notFound();

  const percentage =
    requestedProduct.targetAmount > 0
      ? Math.min(
          (requestedProduct.fundedAmount / requestedProduct.targetAmount) * 100,
          100
        )
      : 0;

  return (
    <>
      <Header title="Edit Requested Product" />
      <main className=" relative z-10 flex min-h-screen items-center justify-center  p-4">
        <div className="w-full max-w-3xl space-y-6 rounded-xl border border-gray-800 bg-gray-800  p-8 text-white shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold">{requestedProduct.name}</h1>
              <p className="text-sm text-gray-400">ID: {requestedProduct.id}</p>
            </div>
            <span className="rounded-full bg-orange-500 px-3 py-1 text-sm font-semibold">
              {requestedProduct.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <p>
              Quantity: <strong>{requestedProduct.quantity}</strong>
            </p>
            <p>
              Price: <strong>{formatCurrency(requestedProduct.price)}</strong>
            </p>
            <p>
              Funded Amount:{" "}
              <strong>{formatCurrency(requestedProduct.fundedAmount)}</strong>
            </p>
            <p>
              Target Amount:{" "}
              <strong>{formatCurrency(requestedProduct.targetAmount)}</strong>
            </p>
            <p>
              Created At:{" "}
              <strong>
                {formatDateTime(requestedProduct.createdAt).dateTime}
              </strong>
            </p>
            <p>
              Base Product ID:{" "}
              <strong>{requestedProduct.baseProductId || "-"}</strong>
            </p>
          </div>
          <div className="flex justify-center py-6">
            <CircularProgress value={percentage} />
          </div>

          <RequestedProductActions
            requestedProduct={{
              ...requestedProduct,
            }}
          />
        </div>
      </main>
    </>
  );
};

export default RequestedProductPage;
