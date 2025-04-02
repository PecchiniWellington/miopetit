import ConfigCategoryPage from "@/components/components_page/category_page";
import { getMyCart } from "@/core/actions/cart/cart.actions";
import { getProductsByMainCategory } from "@/core/actions/products/get-product-by-category-type";
import { getFiltersByMainCategory } from "@/core/actions/products/product-infos.ts/get-filters-for-sub-category";
import { IQueryParams } from "@/core/actions/types";
import { indispensableDog } from "@/core/db-static/indispensable/indispensable-dog";

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

  const productFilters = await getFiltersByMainCategory({
    mainCategorySlug: categories,
    categoryType: subCategories,
  });

  const products = await getProductsByMainCategory({
    mainCategorySlug: categories,
    categoryType: subCategories,
    query: queries,
  });

  const myCart = await getMyCart();

  return (
    <ConfigCategoryPage
      indispensable={indispensableDog}
      mainCategory={cat}
      productFilters={productFilters}
      initialProducts={products}
      myCart={myCart}
    />
  );
};
export default MainCategory;
