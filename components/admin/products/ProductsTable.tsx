"use client";

import DeleteDialog from "@/components/shared/delete-dialog";
import Pagination from "@/components/shared/pagination";
import SortableTable from "@/components/shared/sortable-table";
import { deleteProduct } from "@/core/actions/products";
import { IProduct } from "@/core/validators";
import { formatId } from "@/lib/utils";
import { motion } from "framer-motion";
import { Edit, Eye } from "lucide-react";
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
            { key: "category", label: "CATEGORY" },
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
                {formatId(product.id)}
              </td>
              <td className="flex items-center gap-2 whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-100">
                <Image
                  src={product.image?.[0] || "/images/placeholder.jpg"}
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
                {product.category || "N/A"}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                {product.stock}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                {product.rating}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                <button className="mr-2 text-indigo-400 hover:text-indigo-300">
                  <Link href={`/admin/products/${product.id}/edit`}>
                    <Edit size={18} />
                  </Link>
                </button>
                <button className="ml-2 text-orange-400 hover:text-orange-300">
                  <Link href={`/admin/products/${product.id}/resume`}>
                    <Eye size={18} />
                  </Link>
                </button>
                <DeleteDialog id={product.id} action={deleteProduct} />
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
