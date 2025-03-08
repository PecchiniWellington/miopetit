import ConfigCategoryPage from "@/components/components_page/category_page";
import { getMyCart } from "@/core/actions/cart/cart.actions";
import { getAllProductsBySlug } from "@/core/actions/products/get-all-product-by-slug";
import { getFiltersForCategory } from "@/core/actions/products/product-infos.ts/get-product-category.action";
import { IQueryParams } from "@/core/actions/types";
import { indispensableDog } from "@/core/db-static/indispensable/indispensable-dog";

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

  const products = await getAllProductsBySlug({
    slug: cat || "",
    query: queries,
  });

  const myCart = await getMyCart();

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
