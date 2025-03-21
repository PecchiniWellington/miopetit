"use client";

import BrandButton from "@/components/shared/brand-components/brand-button";
import GenericModal from "@/components/shared/modals/delete-dialog";
import Pagination from "@/components/shared/pagination";
import SortableTable from "@/components/shared/tables/sortable-table";
import { deleteProduct } from "@/core/actions/products";
import { IProduct } from "@/core/validators";
import { formatId } from "@/lib/utils";
import { motion } from "framer-motion";
import { AlertTriangle, Edit, Eye, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import AdminSearch, { SearchProvider } from "../admin-search";

const ProductsTable = ({
  products,
  totalPages,
  page,
}: {
  products: IProduct[];
  totalPages: number;
  page: number;
}) => {
  const t = useTranslations("ModalDelete.ProductDelete");
  return (
    <motion.div
      className="mb-8 rounded-xl border border-gray-700 bg-gray-800 bg-opacity-50 p-6 shadow-lg backdrop-blur-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-100">Product List</h2>
        <div className="relative">
          <SearchProvider>
            <AdminSearch />
          </SearchProvider>
        </div>
      </div>

      <div className="overflow-x-auto">
        <SortableTable
          columns={[
            { key: "id", label: "ID" },
            { key: "name", label: "NAME" },
            { key: "price", label: "PRICE" },
            { key: "productCategory", label: "CATEGORY" },
            { key: "stock", label: "STOCK" },
            { key: "rating", label: "RATING" },
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
                  src={product.images?.[0] || "/images/placeholder.jpg"}
                  alt="Product img"
                  className="size-10 rounded-full"
                  height={40}
                  width={40}
                />
                {product.name}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                {product.price}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                {product.productCategory
                  .map((p: { name: string }) => p.name)
                  .join(", ") || "N/A"}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                {product.stock}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                {product.rating}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                <BrandButton>
                  <Link href={`/admin/products/${product.id}/edit`}>
                    <Edit size={18} />
                  </Link>
                </BrandButton>
                <BrandButton variant="warning">
                  <Link href={`/admin/products/${product.id}/resume`}>
                    <Eye size={18} />
                  </Link>
                </BrandButton>

                <GenericModal
                  triggerButton={
                    <BrandButton
                      variant="danger"
                      icon={<Trash2 className="mr-2 size-5" />}
                    >
                      {t("delete_product_button")}
                    </BrandButton>
                  }
                  title={t("delete_product_modal.title")}
                  description={t("delete_product_modal.description")}
                  confirmText={t("delete_product_modal.delete_button")}
                  cancelText={t("delete_product_modal.cancel_button")}
                  icon={<AlertTriangle className="size-5 text-red-500" />}
                  variant="danger"
                  onConfirm={() => {
                    console.log("delete product", product);
                    return deleteProduct(product.id!);
                  }}
                />
              </td>
            </motion.tr>
          )}
        />
      </div>

      {/* PAGINAZIONE */}
      <div className="mt-4 flex justify-between">
        <Pagination page={Number(page) || 1} totalPages={totalPages} />
      </div>
    </motion.div>
  );
};

export default ProductsTable;
