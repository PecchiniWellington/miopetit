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
import {
  deleteCategory,
  getAllCategories,
} from "@/lib/actions/admin/admin.actions";
import { formatDateTime, formatId } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import DownloadCSV from "./download-csv";

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

  const categories = await getAllCategories();

  const csvData =
    categories &&
    categories.data?.map((category: any) => ({
      ID: formatId(category.id),
      Name: category.name,
      Slug: category.slug || "N/A",
      Created_At: formatDateTime(category.createdAt).dateTime,
      Updated_At: formatDateTime(category.updatedAt).dateTime,
      Description: category.description || "N/A",
    }));

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <LayoutTitle title="Categories" />
          {searchQuery && (
            <div>
              Filtered by <i>&quot;{searchQuery}&quot;</i>{" "}
              <Link href="/admin/categories">
                <DynamicButton>Remove Filter</DynamicButton>
              </Link>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <DynamicButton>
            <Link href="/admin/categories/create">Create Category</Link>
          </DynamicButton>
          <DownloadCSV csvData={csvData} />
        </div>
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
            <TableHead className="hidden">DESCRIPTION</TableHead>
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
                <DeleteDialog id={product.id} action={deleteCategory} />
              </TableCell>
              {/* hidden */}
              <TableCell className="hidden">
                {product.description ? product.description : "N/A"}
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
