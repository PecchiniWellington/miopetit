import Header from "@/components/admin/common/Header";
import ProductForm from "@/components/admin/product-form/product-form";
import { getAllCategories } from "@/core/actions/products/product-infos.ts/get-product-category.action";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Product",
};

const CreateProductPage = async () => {
  const { data } = await getAllCategories();
  return (
    <div className="relative z-50  ">
      <Header title="Product Create" />
      <div className="mx-auto my-8 max-w-5xl  space-y-8">
        <ProductForm type="Create" categories={data} />
      </div>
    </div>
  );
};

export default CreateProductPage;
