import ProductForm from "@/components/admin/product-form/product-form";
import { getProductById } from "@/core/actions/products";
import { getAllCategories } from "@/core/actions/products/product-infos.ts/get-product-category.action";
import { Metadata } from "next";
import { notFound } from "next/navigation";

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
    <div className="mx-auto max-w-5xl space-y-8">
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
