import { auth } from "@/auth";
import ConfigCategoryPage from "@/components/components_page/category_page";
import { getMyCart } from "@/core/actions/cart/cart.actions";
import { getProductsByContributor } from "@/core/actions/products/get-all-product-by-contributor";
import { getFiltersForCategoryByParentId } from "@/core/actions/products/product-infos.ts/get-product-category.action";
import { IQueryParams } from "@/core/actions/types";
import { notFound } from "next/navigation";

const MainCategory = async ({
  searchParams,
  params,
}: {
  searchParams: Promise<{ [key: string]: string | string[] }>;
  params: Promise<{ slug: string; sort: string }>;
}) => {
  const { slug } = await params;

  console.log("categories", await params);

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
  } = await getFiltersForCategoryByParentId(slug);
  const myCart = await getMyCart();

  console.log("productFilters", productFilters);

  const productsResponse = await getProductsByContributor({
    contributorId: "f232254a-b4fc-4b6b-8272-93d54a206b24",
    query: queries,
  });

  if (!productFilters || Object.keys(productFilters).length === 0) notFound();
  return (
    <ConfigCategoryPage
      mainCategory={slug}
      productFilters={productFilters}
      products={productsResponse}
      myCart={myCart}
      userId={userId}
    />
  );
};

export default MainCategory;
