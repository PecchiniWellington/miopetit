import CategoryForm from "@/components/admin-1/category-form";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Create Product",
};

const CreateCategoriesPage = () => {
  return (
    <>
      <h2 className="h2-bold">Create Category</h2>
      <div className="my-8">
        <CategoryForm type="Create" />
      </div>
    </>
  );
};

export default CreateCategoriesPage;
