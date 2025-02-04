import CategoryForm from "@/components/admin-1/category-form";
import {
  getAllCategories,
  getCategoryById,
} from "@/lib/actions/admin/admin.actions";

import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

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
    <div className="space-y-8 max-w-5-xl mx-auto">
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
