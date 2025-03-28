import { auth } from "@/auth";
import ConfigCategoryPage from "@/components/components_page/category_page";
import { getMyCart } from "@/core/actions/cart/cart.actions";
import { getContributorBySlug } from "@/core/actions/contributors/get-contributor-by-slug";
import { getProductsByContributor } from "@/core/actions/products/get-all-product-by-contributor";
import { getFiltersForCategoryByParentId } from "@/core/actions/products/product-infos.ts/get-product-category.action";
import { IQueryParams } from "@/core/actions/types";
import { notFound } from "next/navigation";

const MainCategory = async ({
  searchParams,
  params,
}: {
  searchParams: Promise<{ [key: string]: string | string[] }>;
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params; // Await the params promise

  const userLogged = await auth();
  const userId = userLogged?.user?.id;

  const queries: IQueryParams = Object.fromEntries(
    Object.entries(await searchParams).map(([key, value]) => [
      key,
      Array.isArray(value) ? value.join(",") : value.toString(),
    ])
  );

  const rawProductFilters = await getFiltersForCategoryByParentId(slug);
  const productFilters =
    rawProductFilters && typeof rawProductFilters === "object"
      ? Object.fromEntries(
          Object.entries(rawProductFilters).map(([key, value]) => [
            key,
            Array.isArray(value) ? value : value.toString(),
          ])
        )
      : {};
  const myCart = await getMyCart();

  console.log("queries", productFilters);

  const contributor = await getContributorBySlug(slug);
  const productsResponse = contributor
    ? await getProductsByContributor({
        contributorId: contributor.id,
        query: queries,
      })
    : null;

  if (!productFilters || Object.keys(productFilters).length === 0) notFound();

  return (
    <>
      {contributor ? (
        <section className="relative mx-auto mb-10 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-green-100 via-white to-purple-100 p-10 text-center shadow-lg">
          <div className="relative z-10">
            <h1 className="text-4xl font-extrabold text-purple-700 md:text-5xl">
              Benvenuto da{" "}
              <span className="text-green-600">{contributor.name}</span>
            </h1>
            {contributor?.description && (
              <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-600">
                {contributor.description}
              </p>
            )}
          </div>
          <div className="absolute left-[-30px] top-[-30px] z-0 size-40 rounded-full bg-green-200 opacity-20 blur-3xl" />
          <div className="absolute bottom-[-30px] right-[-30px] z-0 size-40 rounded-full bg-purple-300 opacity-20 blur-3xl" />
        </section>
      ) : (
        <div className="text-center text-red-600">Contributor non trovato</div>
      )}

      {productsResponse && productsResponse.length > 0 ? (
        <ConfigCategoryPage
          mainCategory={slug}
          productFilters={productFilters}
          initialProducts={productsResponse || []}
          myCart={myCart}
          userId={userId}
        />
      ) : (
        <div className="flex flex-col items-center justify-center py-10">
          <h2 className="text-2xl font-semibold text-gray-700">
            {contributor?.name || "Questo partner"} non ha ancora inserito
            nessun prodotto
          </h2>
          <p className="mt-4 text-gray-500">
            Torna presto per scoprire i prodotti che saranno disponibili!
          </p>
        </div>
      )}
    </>
  );
};

export default MainCategory;
