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
import { getAllCategories } from "@/lib/actions/admin/admin.actions";
import { deleteProduct } from "@/lib/actions/product.actions";
import { formatDateTime, formatId } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const AdminCategoriesPage = async (props: {
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

  console.log(searchQuery);

  const categories = await getAllCategories();

  return (
    <div className="space-y-2">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <LayoutTitle title="Categories" />
          {searchQuery && (
            <div>
              Filterd by <i>&quot;{searchQuery}&quot;</i>{" "}
              <Link href="/admin/categories">
                <DynamicButton>Remove Filter</DynamicButton>
              </Link>
            </div>
          )}
        </div>
        <DynamicButton>
          <Link href="/admin/categories/create">Create Category</Link>
        </DynamicButton>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>NAME</TableHead>
            <TableHead>SLUG</TableHead>
            <TableHead>CREATED AT</TableHead>
            <TableHead>UPDATED AT</TableHead>
            <TableHead className="w-[100px]">ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories?.data?.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{formatId(product.id)}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.slug ? product.slug : "N/A"}</TableCell>
              <TableCell>
                {formatDateTime(product.createdAt).dateTime}
              </TableCell>
              <TableCell>
                {formatDateTime(product.updatedAt).dateTime}
              </TableCell>
              <TableCell className="flex gap-1">
                <DynamicButton>
                  <Link href={`/admin/categories/${product.id}`}>Edit</Link>
                </DynamicButton>
                <DeleteDialog id={product.id} action={deleteProduct} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Pagination */}
      {categories && (categories.totalPages ?? 0) > 1 && (
        <Pagination page={page} totalPages={categories.totalPages ?? 0} />
      )}
    </div>
  );
};

export default AdminCategoriesPage;
