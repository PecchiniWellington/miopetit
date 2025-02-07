import CategoryForm from "@/components/admin/category-form";
import { getCategoryById } from "@/core/actions/admin/admin.actions";

import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Update Category",
  description: "Admin Category Update",
};

const AdminCategoryUpdatePage = async (props: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await props.params;
  const category = await getCategoryById(id);

  if (!category) return notFound();

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <h1 className="h2-bold">Update Category</h1>
      <CategoryForm
        type="Update"
        category={category.data}
        categoryId={category.data?.id}
      />
    </div>
  );
};

export default AdminCategoryUpdatePage;
