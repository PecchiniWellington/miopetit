import DynamicButton from "@/components/dynamic-button";
import LayoutTitle from "@/components/layout-title";
import DeleteDialog from "@/components/shared/delete-dialog";
import Pagination from "@/components/shared/pagination";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteProduct, getAllProducts } from "@/lib/actions/product.actions";
import { formatCurrency, formatDateTime, formatId } from "@/lib/utils";
import { Trash } from "lucide-react";
import Link from "next/link";
import React from "react";
import DownloadCSV from "../categories/download-csv";
import { Product } from "@/types";
import { PRODUCT_DEFAULT_VALUES } from "@/lib/constants";

const ProductsPage = async (props: {
  searchParams: {
    query: string;
    page: string;
    category: string;
  };
}) => {
  const searchParams = await props.searchParams;

  const page = Number(searchParams.page) || 1;
  const searchQuery = searchParams.query || "";
  const category = searchParams.category || "";

  const products = await getAllProducts({
    query: searchQuery,
    page,
    category,
  });

  const csvData =
    products &&
    products.data?.map((product: Product) => ({
      name: product.name || PRODUCT_DEFAULT_VALUES.name,
      slug: product.slug || PRODUCT_DEFAULT_VALUES.slug,
      categoryId: product.categoryId || PRODUCT_DEFAULT_VALUES.categoryId,
      brand: product.brand || PRODUCT_DEFAULT_VALUES.name,
      description: product.description || PRODUCT_DEFAULT_VALUES.description,
      stock: product.stock || PRODUCT_DEFAULT_VALUES.stock,
      images: product.images || PRODUCT_DEFAULT_VALUES.images,
      isFeatured: product.isFeatured || PRODUCT_DEFAULT_VALUES.isFeatured,
      banner: product.banner || PRODUCT_DEFAULT_VALUES.banner,
      price: product.price || PRODUCT_DEFAULT_VALUES.price,
    }));

  return (
    <div className="space-y-2">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <LayoutTitle title="Products" />
          {searchQuery && (
            <div>
              Filterd by <i>&quot;{searchQuery}&quot;</i>{" "}
              <Link href="/admin/products">
                <DynamicButton>Remove Filter</DynamicButton>
              </Link>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <DynamicButton>
            <Link href="/admin/products/create">Create Product</Link>
          </DynamicButton>
          <DownloadCSV csvData={csvData} />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>NAME</TableHead>
            <TableHead className="text-right">PRICE</TableHead>
            <TableHead>CATEGORY</TableHead>
            <TableHead>STOCK</TableHead>
            <TableHead>RATING</TableHead>
            <TableHead className="w-[100px]">ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.data.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{formatId(product.id)}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell className="text-right">
                {formatCurrency(product.price)}
              </TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>{product.rating}</TableCell>
              <TableCell className="flex gap-1">
                <DynamicButton>
                  <Link href={`/admin/products/${product.id}`}>Edit</Link>
                </DynamicButton>
                <DeleteDialog id={product.id} action={deleteProduct} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Pagination */}
      {products.totalPages > 1 && products.totalPages && (
        <Pagination page={page} totalPages={products.totalPages} />
      )}
    </div>
  );
};

export default ProductsPage;
