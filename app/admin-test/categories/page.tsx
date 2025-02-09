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
import { deleteCategory } from "@/core/actions/admin/admin.actions";
import { ICategory } from "@/core/validators";
import { formatDateTime, formatId } from "@/lib/utils";
import Link from "next/link";
import DownloadCSV from "./download-csv";
import { getAllCategories } from "@/core/actions/products/product-infos.ts/get-product-category.action";

const AdminCategoriesPage: React.FC<{
  searchParams: Promise<{
    query: string;
    page: string;
    category: string;
  }>;
}> = async (props) => {
  const searchParams = await props.searchParams;

  const page = Number(searchParams.page) || 1;
  const searchQuery = searchParams.query || "";

  const categoriesResponse = await getAllCategories();
  const categories = JSON.parse(JSON.stringify(categoriesResponse));

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
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
          <DownloadCSV csvData={categories} />
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
          {categories?.data?.map((category: ICategory) => (
            <TableRow key={category.id}>
              <TableCell>{formatId(category.id)}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell>{category.slug ? category.slug : "N/A"}</TableCell>
              <TableCell>
                {formatDateTime(category?.createdAt?.toString()).dateTime}
              </TableCell>
              <TableCell>
                {formatDateTime(category?.updatedAt?.toString()).dateTime}
              </TableCell>

              <TableCell className="flex gap-1">
                <DynamicButton>
                  <Link href={`/admin/categories/${category.id}`}>Edit</Link>
                </DynamicButton>
                <DeleteDialog id={category.id} action={deleteCategory} />
              </TableCell>
              {/* hidden */}
              <TableCell className="hidden">
                {category.description ? category.description : "N/A"}
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
