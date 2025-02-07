import ProductForm from "@/components/admin-1/product-form/product-form";
import { getAllCategories } from "@/core/actions/admin/admin.actions";
import { getProductById } from "@/core/actions/products";
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
  const categoriesDistribution = JSON.parse(JSON.stringify(data));

  if (!product) return notFound();

  return (
    <div className="relative z-10 mx-auto max-w-7xl flex-1 space-y-8 overflow-auto px-4 py-6 lg:px-8">
      <h1 className="h2-bold">Update Product</h1>
      <ProductForm
        type="Update"
        product={product}
        productId={product.id}
        categories={categoriesDistribution}
      />
    </div>
  );
};

export default AdminProductUpdatePage;
