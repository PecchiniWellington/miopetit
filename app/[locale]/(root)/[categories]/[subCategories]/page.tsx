import ConfigCategoryPage from "@/components/components_page/category_page";
import { getMyCart } from "@/core/actions/cart/cart.actions";
import { getAllProductsBySlug } from "@/core/actions/products/get-all-product-by-slug";
import { getFiltersForCategory } from "@/core/actions/products/product-infos.ts/get-product-category.action";
import { IQueryParams } from "@/core/actions/types";
import { indispensableDog } from "@/core/db-static/indispensable/indispensable-dog";
import { notFound } from "next/navigation";

const MainCategory = async ({
  searchParams,
  params,
}: {
  searchParams: Promise<{ [key: string]: string | string[] }>;
  params: Promise<{ categories: string; subCategories: string; sort: string }>;
}) => {
  const { categories, subCategories } = await params;

  const queries: IQueryParams = Object.fromEntries(
    Object.entries(await searchParams).map(([key, value]) => [
      key,
      Array.isArray(value) ? value.join(",") : value.toString(),
    ])
  );

  const cat = `${categories}/${subCategories}`;

  const productFilters = await getFiltersForCategory(cat);
  const products = await getAllProductsBySlug({
    slug: cat,
    query: queries,
  });
  const myCart = await getMyCart();

  if (!productFilters || Object.keys(productFilters).length === 0) notFound();
  return (
    <ConfigCategoryPage
      indispensable={indispensableDog}
      mainCategory={cat}
      productFilters={productFilters}
      products={products}
      myCart={myCart}
    />
  );
};

export default MainCategory;
