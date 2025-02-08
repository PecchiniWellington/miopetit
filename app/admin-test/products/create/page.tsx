import ProductForm from "@/components/admin/product-form/product-form";
import { getAllCategories } from "@/core/actions/products/product-infos.ts/get-product-category.action";
import { Metadata } from "next";

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
