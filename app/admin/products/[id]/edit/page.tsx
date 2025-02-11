import ProductForm from "@/components/admin/product-form/product-form";
import { getProductById } from "@/core/actions/products";
import {
  getAllBrands,
  getAllPathologies,
  getAllProtein,
} from "@/core/actions/products/product-infos.ts";
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
  const categoriesDistribution = JSON.parse(JSON.stringify(categories.data));
  const brandsDistribution = JSON.parse(JSON.stringify(brands?.data));
  const pathologiesDistribution = JSON.parse(JSON.stringify(pathologies?.data));
  const proteinsDistribution = JSON.parse(JSON.stringify(proteins?.data));

  if (!product) return notFound();

  return (
    <div className="relative z-10 mx-auto max-w-7xl flex-1 space-y-8 overflow-auto px-4 py-6 lg:px-8">
      <h1 className="h2-bold">Update Product</h1>
      <ProductForm
        type="Update"
        product={{
          ...product,
          isFeatured: !!product.isFeatured,
          rating: product.rating,
          productBrand: product.productBrand ?? undefined,
          category: product.category ?? undefined,
        }}
        productId={product.id}
        categories={categoriesDistribution}
        brands={brandsDistribution}
        patologies={pathologiesDistribution}
        proteins={proteinsDistribution}
      />
    </div>
  );
};

export default AdminProductUpdatePage;
