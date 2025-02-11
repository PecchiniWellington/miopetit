"use client";

import DeleteDialog from "@/components/shared/delete-dialog";
import { deleteProduct } from "@/core/actions/products";
import { IProduct } from "@/core/validators";
import { formatId } from "@/lib/utils";
import { motion } from "framer-motion";
import { Edit, Eye, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const PRODUCT_DATA = [
  {
    id: 1,
    name: "Wireless Earbuds",
    category: "Electronics",
    price: 59.99,
    stock: 143,
    sales: 1200,
  },
  {
    id: 2,
    name: "Leather Wallet",
    category: "Accessories",
    price: 39.99,
    stock: 89,
    sales: 800,
  },
  {
    id: 3,
    name: "Smart Watch",
    category: "Electronics",
    price: 199.99,
    stock: 56,
    sales: 650,
  },
  {
    id: 4,
    name: "Yoga Mat",
    category: "Fitness",
    price: 29.99,
    stock: 210,
    sales: 950,
  },
  {
    id: 5,
    name: "Coffee Maker",
    category: "Home",
    price: 79.99,
    stock: 78,
    sales: 720,
  },
];

const ProductsTable = ({ products }: { products: { data: IProduct[] } }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [, setFilteredProducts] = useState(PRODUCT_DATA);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = (e.target as HTMLInputElement).value.toLowerCase();
    setSearchTerm(term);
    const filtered = PRODUCT_DATA?.filter(
      (product) =>
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term)
    );

    setFilteredProducts(filtered);
  };

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
          <input
            type="text"
            placeholder="Search products..."
            className="rounded-lg bg-gray-700 py-2 pl-10 pr-4 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleSearch}
            value={searchTerm}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                NAME
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                PRICE
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                CATEGORY
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                STOCK
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                RATING
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                ACTIONS
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {products &&
              products?.data.map((product: IProduct) => (
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
                      src={
                        product.images.length === 0
                          ? "/images/placeholder.jpg"
                          : `${product.images[0]}`
                      }
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
                    {product?.category?.name}
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
                        {" "}
                        <Edit size={18} />
                      </Link>
                    </button>

                    <button className="ml-2 text-orange-400 hover:text-orange-300">
                      <Link href={`/admin/products/${product.id}/resume`}>
                        {" "}
                        <Eye size={18} />
                      </Link>
                    </button>

                    <DeleteDialog id={product.id} action={deleteProduct} />
                  </td>
                </motion.tr>
              ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
export default ProductsTable;
