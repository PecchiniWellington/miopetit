import ProductForm from "@/components/admin-1/product-form/product-form";
import { getAllCategories } from "@/lib/actions/admin/admin.actions";
import { getProductById } from "@/lib/actions/product.actions";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Update Product",
  description: "Admin Product Update",
};

const AdminProductUpdatePage = async (props: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await props.params;
  const product = await getProductById(id);
  const { data } = await getAllCategories();

  if (!product) return notFound();

  return (
    <div className="space-y-8 mx-auto flex-1 overflow-auto relative z-10 max-w-7xl py-6 px-4 lg:px-8">
      <h1 className="h2-bold">Update Product</h1>
      <ProductForm
        type="Update"
        product={product}
        productId={product.id}
        categories={data}
      />
    </div>
  );
};

export default AdminProductUpdatePage;
