"use client";

import AdminSearch, { SearchProvider } from "@/components/admin/admin-search";
import BrandButton from "@/components/shared/brand-components/brand-button";
import GenericModal from "@/components/shared/modals/delete-dialog";
import Pagination from "@/components/shared/pagination";
import SortableTable from "@/components/shared/tables/sortable-table";
import { deleteProduct } from "@/core/actions/products";
import { IContributor } from "@/core/validators/contributors.validator";
import { formatDateTime, formatId } from "@/lib/utils";
import { motion } from "framer-motion";

import { AlertTriangle, Edit, Eye, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ContributorsTable = ({
  contributors,
  totalPages = 1,
  page = 1,
}: {
  contributors: IContributor[];
  totalPages: number;
  page: number;
}) => {
  console.log("contributors", contributors);
  /*  const t = useTranslations("ModalDelete.ProductDelete"); */
  return (
    <motion.div
      className="mb-8 rounded-xl border border-gray-700 bg-gray-800  p-6 shadow-lg backdrop-blur-md"
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
        {contributors ? (
          <SortableTable
            columns={[
              { key: "id", label: "ID" },
              { key: "name", label: "NAME" },
              { key: "type", label: "TYPE" },
              { key: "createdAt", label: "CREATION" },
              /*   { key: "userEmail", label: "USER EMAIL" },
              { key: "userName", label: "USER NAME" }, */
            ]}
            data={contributors}
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
                    src={product.logo || "/images/placeholder.jpg"}
                    alt="Product img"
                    className="size-10 rounded-full"
                    height={40}
                    width={40}
                  />
                  {product.name}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                  {product.type}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                  {formatDateTime(product.createdAt as string).dateTime}
                </td>
                {/*  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                  {product.users. || "N/A"}
                </td> */}
                <td className="flex gap-1 whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                  <BrandButton size="small">
                    <Link href={`/admin/contributors/${product.id}/edit`}>
                      <Edit size={18} />
                    </Link>
                  </BrandButton>
                  <BrandButton variant="warning" size="small">
                    <Link href={`/admin/contributors/${product.id}/resume`}>
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
                    title="Delete Contributor"
                    description={`Are you sure you want to delete ${product.name}?`}
                    confirmText={"Delete"}
                    cancelText={"Cancel"}
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
        ) : (
          <div className="flex flex-col items-center justify-center py-10">
            <p className="text-lg font-semibold text-gray-300">
              No contributors found
            </p>
            <p className="text-sm text-gray-500">
              Try adjusting your search or adding new contributors.
            </p>
          </div>
        )}
      </div>

      {/* PAGINAZIONE */}
      {contributors && (
        <div className="mt-4 flex justify-between">
          <Pagination page={Number(page) || 1} totalPages={totalPages} />
        </div>
      )}
    </motion.div>
  );
};

export default ContributorsTable;
