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
  let product = await getProductById(id);
  if (product) {
    product = {
      ...product,
    };
  }
  const categories = await getAllCategories();
  const brands = await getAllBrands();
  const pathologies = await getAllPathologies();
  const proteins = await getAllProtein();
  const unitValues = await getUnitValue();
  const unitOfMeasure = await getUnitOfMeasure();
  const allFeatures = await getAllFeatures();

  const categoriesDistribution = JSON.parse(JSON.stringify(categories.data));
  const brandsDistribution = JSON.parse(JSON.stringify(brands?.data));
  const pathologiesDistribution = JSON.parse(JSON.stringify(pathologies?.data));
  const proteinsDistribution = JSON.parse(JSON.stringify(proteins?.data));
  const unitValuesDistribution = JSON.parse(JSON.stringify(unitValues));
  const unitOfMeasureDistribution = JSON.parse(JSON.stringify(unitOfMeasure));
  const allFeaturesDistribution = JSON.parse(JSON.stringify(allFeatures));

  if (!product) return notFound();

  return (
    <div className="relative z-10 mx-auto max-w-7xl flex-1 space-y-8 overflow-auto px-4 py-6 lg:px-8">
      <h1 className="h2-bold">Update Product</h1>
      <ProductForm
        type="Update"
        product={{
          ...product,
          price: Number(product.price),
          isFeatured: !!product.isFeatured,
          productBrand: product.productBrand ?? undefined,
          category: product.category ?? undefined,
          productUnitFormat: product.productUnitFormat
            ? {
                ...product.productUnitFormat,
                unitValue: {
                  ...product.productUnitFormat.unitValue,
                  value: Number(product.productUnitFormat.unitValue.value),
                },
              }
            : undefined,

          productProteinsId: product.productProteinOnProduct.map(
            (item: {
              productId: string;
              productProteinId: string;
              productProtein: { id: string; name: string };
            }) => item.productProteinId
          ),
          rating: Number(product.rating),
        }}
        productId={product.id}
        categories={categoriesDistribution}
        brands={brandsDistribution}
        pathologies={pathologiesDistribution}
        proteins={proteinsDistribution}
        unitValues={unitValuesDistribution}
        unitOfMeasure={unitOfMeasureDistribution}
        allFeatures={allFeaturesDistribution}
      />
    </div>
  );
};

export default AdminProductUpdatePage;
