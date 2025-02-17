import { getAllProductsBySlug } from "@/core/actions/products/get-all-product-by-slug";
import { getFiltersForCategory } from "@/core/actions/products/product-infos.ts/get-product-category.action";
import { IQueryParams } from "@/core/actions/types";
import { indispensableDog } from "@/core/db-static/indispensable/indispensable-dog";
import ConfigCategoryPage from "../config-category-page";

const MainCategory = async ({
  searchParams,
  params,
}: {
  searchParams: { [key: string]: string | string[] };
  params: { categories: string; sort: string };
}) => {
  const { categories } = await params;

  const queries: IQueryParams = Object.fromEntries(
    Object.entries(searchParams).map(([key, value]) => [
      key,
      Array.isArray(value) ? value.join(",") : value.toString(),
    ])
  );

  const productFilters = await getFiltersForCategory(categories);

  const products = await getAllProductsBySlug({
    slug: categories,
    query: queries,
  });

  return (
    <ConfigCategoryPage
      indispensable={indispensableDog}
      mainCategory={categories}
      productFilters={productFilters}
      products={products}
    />
  );
};

export default MainCategory;
