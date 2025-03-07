import { getAllProductsBySlug } from "@/core/actions/products/get-all-product-by-slug";
import { getFiltersForCategory } from "@/core/actions/products/product-infos.ts/get-product-category.action";
import { IQueryParams } from "@/core/actions/types";
import { indispensableDog } from "@/core/db-static/indispensable/indispensable-dog";
import ConfigCategoryPage from "../../../../../../components/components_page/category_page";

const MainCategory = async ({
  searchParams: searchParamsPromise,
  params: paramsPromise,
}: {
  searchParams: Promise<{ [key: string]: string | string[] }>;
  params: Promise<{
    categories: string;
    subCategories?: string;
    subSubCategories?: string;
    sort?: string;
  }>;
}) => {
  const searchParams = await searchParamsPromise;
  const params = await paramsPromise;
  const { categories, subCategories, subSubCategories } = params;

  const queries: IQueryParams = Object.fromEntries(
    Object.entries(searchParams).map(([key, value]) => [
      key,
      Array.isArray(value) ? value.join(",") : value.toString(),
    ])
  );

  const cat = `${categories}/${subCategories}/${subSubCategories}`;

  const productFilters = subSubCategories
    ? await getFiltersForCategory(cat)
    : {};

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const products: any = await getAllProductsBySlug({
    slug: cat || "",
    query: queries,
  });

  console.log("PPPPPP3", { products, cat, queries });
  return (
    <ConfigCategoryPage
      indispensable={indispensableDog}
      mainCategory={cat}
      productFilters={productFilters}
      products={products}
    />
  );
};

export default MainCategory;
