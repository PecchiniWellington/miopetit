"use client";

import BrandBadge from "@/components/shared/brand-components/brand-badge";
import BrandButton from "@/components/shared/brand-components/brand-button";
import GenericModal from "@/components/shared/modals/delete-dialog";
import Pagination from "@/components/shared/pagination";
import SortableTable from "@/components/shared/tables/sortable-table";
import { formatId } from "@/lib/utils";
import { motion } from "framer-motion";
import { AlertTriangle, Edit, Eye, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import AdminSearch, { SearchProvider } from "../admin-search";

interface RequestedProduct {
  id: string;
  name: string;
  quantity: number;
  price: number;
  fundedAmount: number;
  targetAmount: number;
  status: "PENDING" | "FUNDED" | "DELIVERED"; // <== aggiunto "FUNDED"
  contributor?: {
    id: string;
    name: string;
    type: string;
  };
  image?: string | null;
  createdAt: string;
}

const RequestedProductsTable = ({
  products,
  totalPages,
  page,
}: {
  products: RequestedProduct[] | null;
  totalPages: number;
  page: number;
}) => {
  const t = useTranslations("ModalDelete.ProductDelete");

  return (
    <motion.div
      className="mb-8 rounded-xl border border-gray-700 bg-gray-800 p-6 shadow-lg backdrop-blur-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-100">
          Requested Products
        </h2>
        <div className="relative">
          <SearchProvider>
            <AdminSearch />
          </SearchProvider>
        </div>
      </div>

      <div className="overflow-x-auto">
        {products ? (
          <SortableTable
            columns={[
              { key: "id", label: "ID" },
              { key: "name", label: "NAME" },
              { key: "quantity", label: "QTY" },
              { key: "status", label: "STATUS" },
              { key: "fundedAmount", label: "FUNDED" },
              { key: "targetAmount", label: "TARGET" },
            ]}
            data={products}
            renderRow={(product) => (
              <motion.tr
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                  {product.id ? formatId(product.id) : "N/A"}
                </td>
                <td className="flex items-center gap-2 whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-100">
                  <Image
                    src={product.image || "/images/placeholder.jpg"}
                    alt="Requested product image"
                    className="size-10 rounded-full"
                    width={40}
                    height={40}
                  />
                  {product.name}
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                  {product.quantity}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                  <BrandBadge
                    className="text-xs font-semibold"
                    variant={
                      product.status === "PENDING"
                        ? "warning"
                        : product.status === "FUNDED"
                          ? "success"
                          : "info"
                    }
                    label={product.status}
                  />
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-green-400">
                  €{product.fundedAmount.toFixed(2)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                  €{product.targetAmount.toFixed(2)}
                </td>

                <td className="flex gap-1 whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                  <BrandButton size="small">
                    <Link href={`/admin/requested-products/${product.id}/edit`}>
                      <Edit size={18} />
                    </Link>
                  </BrandButton>
                  <BrandButton variant="warning" size="small">
                    <Link href={`/admin/requested-products/${product.id}`}>
                      <Eye size={18} />
                    </Link>
                  </BrandButton>
                  <GenericModal
                    triggerButton={
                      <BrandButton
                        size="small"
                        variant="danger"
                        icon={<Trash2 className="size-5" />}
                      />
                    }
                    title={t("delete_product_modal.title")}
                    description={t("delete_product_modal.description")}
                    confirmText={t("delete_product_modal.delete_button")}
                    cancelText={t("delete_product_modal.cancel_button")}
                    icon={<AlertTriangle className="size-5 text-red-500" />}
                    variant="danger"
                    onConfirm={async () => {
                      console.log("delete requestedProduct", product.id);
                      // await deleteRequestedProduct(product.id); // TODO
                      return Promise.resolve();
                    }}
                  />
                </td>
              </motion.tr>
            )}
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-10">
            <p className="text-lg font-semibold text-gray-300">
              No Requested Products found
            </p>
            <p className="text-sm text-gray-500">
              Try adjusting your search or adding new requests.
            </p>
          </div>
        )}
      </div>

      {products && (
        <div className="mt-4 flex justify-between">
          <Pagination page={Number(page) || 1} totalPages={totalPages} />
        </div>
      )}
    </motion.div>
  );
};

export default RequestedProductsTable;
