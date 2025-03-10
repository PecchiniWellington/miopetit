import { auth } from "@/auth";
import ConfigCategoryPage from "@/components/components_page/category_page";
import { getMyCart } from "@/core/actions/cart/cart.actions";
import { getAllProductsBySlug } from "@/core/actions/products/get-all-product-by-slug";
import { getFiltersForCategory } from "@/core/actions/products/product-infos.ts/get-product-category.action";
import { IQueryParams } from "@/core/actions/types";
import { indispensableDog } from "@/core/db-static/indispensable/indispensable-dog";

const MainCategory = async ({
  searchParams,
  params,
}: {
  searchParams: Promise<{ [key: string]: string | string[] }>;
  params: Promise<{ categories: string; sort: string }>;
}) => {
  const { categories } = await params;
  const userLogged = await auth();
  const userId = userLogged?.user?.id;

  const queries: IQueryParams = Object.fromEntries(
    Object.entries(await searchParams).map(([key, value]) => [
      key,
      Array.isArray(value) ? value.join(",") : value.toString(),
    ])
  );

  const productFilters: {
    [key: string]:
      | string
      | number
      | { [key: string]: string | number }
      | Array<string | number | object>;
  } = await getFiltersForCategory(categories);
  const myCart = await getMyCart();

  const productsResponse = await getAllProductsBySlug({
    slug: categories,
    query: queries,
  });

  return (
    <ConfigCategoryPage
      indispensable={indispensableDog}
      mainCategory={categories}
      productFilters={productFilters}
      products={productsResponse}
      myCart={myCart}
      userId={userId}
    />
  );
};

export default MainCategory;
