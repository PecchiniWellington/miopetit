import ProductForm from "@/components/admin/product-form/product-form";
import { getProductById } from "@/core/actions/products";
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
  const categories = await getAllCategories();
  const brands = await getAllBrands();
  const pathologies = await getAllPathologies();
  const proteins = await getAllProtein();
  const unitValues = await getUnitValue();
  const unitOfMeasure = await getUnitOfMeasure();
  const allFeatures = await getAllFeatures();

  if (!product) return notFound();

  return (
    <div className="relative z-10 mx-auto max-w-7xl flex-1 space-y-8 overflow-auto px-4 py-6 lg:px-8">
      <h1 className="h2-bold">Update Product</h1>
      <ProductForm
        type="Update"
        product={product}
        productId={product.id}
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
  );
};

export default AdminProductUpdatePage;
