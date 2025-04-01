import { auth } from "@/auth";
import ProductDonationCard from "@/components/product/brand-product-donation-card";
import { getContributorBySlug } from "@/core/actions/contributors/get-contributor-by-slug";
import { getAllRequestedProduct } from "@/core/actions/products/get-all-requested-product";
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

  const contributor = await getContributorBySlug(slug);
  const productsResponse = contributor
    ? await getAllRequestedProduct({
        contributorId: contributor.id,
        query: queries,
      })
    : null;

  console.log(
    "🚀 ~ file: page.tsx:45 ~ MainCategory ~ productsResponse:",
    productsResponse
  );
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
        <div className="grid grid-cols-1 gap-6 px-4 sm:grid-cols-2 md:grid-cols-3 md:px-8 lg:grid-cols-4">
          {productsResponse.map((product, index) => (
            <ProductDonationCard
              contributor={
                contributor
                  ? {
                      id: contributor.id,
                      slug: contributor.slug,
                      name: contributor.name,
                      type: "SHELTER", // Adjust this value based on your logic
                      openingHours:
                        typeof contributor.openingHours === "object" &&
                        contributor.openingHours !== null &&
                        !Array.isArray(contributor.openingHours)
                          ? contributor.openingHours
                          : {}, // Ensure compatibility with expected type
                    }
                  : undefined
              }
              key={index}
              product={{
                ...product,
                image: product.image ?? undefined, // Ensure image is undefined if null
                notes: product.notes ?? undefined, // Ensure notes is undefined if null
                baseProduct: product.baseProduct
                  ? {
                      ...product.baseProduct,
                      productBrand: product.baseProduct.productBrand
                        ? { name: product.baseProduct.productBrand.name }
                        : undefined,
                    }
                  : undefined, // Ensure baseProduct is compatible or undefined
              }}
            />
          ))}
        </div>
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
