import ProductForm from "@/components/admin-1/product-form/product-form";
import { getAllCategories } from "@/lib/actions/admin/admin.actions";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Create Product",
};

const CreateProductPage = async () => {
  const { data } = await getAllCategories();
  return (
    <>
      <h2 className="h2-bold">Create Product</h2>
      <div className="my-8">
        <ProductForm type="Create" categories={data} />
      </div>
    </>
  );
};

export default CreateProductPage;
