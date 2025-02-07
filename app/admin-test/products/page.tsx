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
import { deleteProduct, getAllProducts } from "@/core/actions/product.actions";
import { formatCurrency, formatId } from "@/lib/utils";
import { ICategory, Product } from "@/types";
import Link from "next/link";
import DownloadCSV from "../categories/download-csv";

const ProductsPage = async (props: {
  searchParams: Promise<{
    query: string;
    page: string;
    category: string;
  }>;
}) => {
  const searchParams = await props.searchParams;

  const page = Number(searchParams.page) || 1;
  const searchQuery = searchParams.query || "";
  const category = searchParams.category || "";

  const productsResponse = await getAllProducts({
    query: searchQuery,
    page,
    category,
  });

  const products = JSON.parse(JSON.stringify(productsResponse));

  return (
    <div className="space-y-2">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <LayoutTitle title="Products" />
          {searchQuery && (
            <div>
              Filtered by <i>&quot;{searchQuery}&quot;</i>{" "}
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
          <DownloadCSV csvData={products.data} />
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
          {products.data.map(
            ({ product }: { product: Product & { category: ICategory } }) => (
              <TableRow key={product.id}>
                <TableCell>{formatId(product.id)}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(product.price)}
                </TableCell>
                <TableCell>{product.category.name}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.rating}</TableCell>
                <TableCell className="flex gap-1">
                  <DynamicButton>
                    <Link href={`/admin/products/${product.id}`}>Edit</Link>
                  </DynamicButton>
                  <DeleteDialog id={product.id} action={deleteProduct} />
                </TableCell>
              </TableRow>
            )
          )}
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
