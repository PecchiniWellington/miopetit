import Header from "@/components/admin/common/Header";
import ProductForm from "@/components/admin/product-form/product-form";
import {
  getAllBrands,
  getAllFeatures,
  getAllPathologies,
  getAllProtein,
} from "@/core/actions/products/product-infos.ts";
import { getAllCategories } from "@/core/actions/products/product-infos.ts/get-product-category.action";
import {
  getUnitOfMeasure,
  getUnitValue,
} from "@/core/actions/products/product-infos.ts/get-product-formats.action";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Product",
};

const CreateProductPage = async () => {
  const categories = await getAllCategories();
  const brands = await getAllBrands();
  const pathologies = await getAllPathologies();
  const proteins = await getAllProtein();
  const unitValues = await getUnitValue();
  const unitOfMeasure = await getUnitOfMeasure();
  const allFeatures = await getAllFeatures();

  return (
    <div className="relative z-50  ">
      <Header title="Product Create" />
      <div className="mx-auto my-8 max-w-5xl  space-y-8">
        <ProductForm
          type="Create"
          categories={Array.isArray(categories.data) ? categories.data : []}
          brands={brands?.map((brand) => ({
            ...brand,
            image: brand.image ?? "",
          }))}
          pathologies={pathologies}
          proteins={proteins}
          unitValues={unitValues ?? []}
          unitOfMeasure={unitOfMeasure ?? []}
          allFeatures={allFeatures?.map((feature) => ({
            ...feature,
            productFeature: {
              ...feature.productFeature,
              image: feature.productFeature.image ?? null,
            },
          }))}
        />
      </div>
    </div>
  );
};

export default CreateProductPage;
