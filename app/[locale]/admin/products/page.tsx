import { auth } from "@/auth";
import Header from "@/components/admin/common/Header";

import ProductsTable from "@/components/admin/products/ProductsTable";
import RequestedProductsTable from "@/components/admin/products/request-products-table";
import DownloadCSV from "@/components/shared/download-csv";
import { getContributorByUserId } from "@/core/actions/contributors/get-contributor-by-user-id";
import { getAllProducts } from "@/core/actions/products";
import { getRequestedProductsByContributor } from "@/core/actions/products/get-all-request-product-shelter.action";
import { removeRequestedProductFromContributor } from "@/core/actions/products/remove-request-product.actoin";
import ROLES from "@/lib/constants/roles";
import Link from "next/link";

const ProductsPage = async (props: {
  searchParams: Promise<{
    query: string;
    page: string;
    category: string;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const searchQuery = searchParams.query || "";
  const userLogged = await auth();
  const user = userLogged?.user;
  const contributor = await getContributorByUserId(user?.id);
  console.log("contributor", user);

  const products =
    (await getAllProducts({
      user,
      query: searchQuery,
      page,
      limit: 10,
    })) || [];

  console.log("products", products);

  const { data: requestedProducts, totalPages } =
    await getRequestedProductsByContributor({
      user,
      contributorId: contributor?.id ?? undefined,
      query: searchQuery,
      page,
      limit: 10,
    });

  console.log("requestedProducts", requestedProducts);

  // Adjust this logic if pagination is implemented
  return (
    <div className="relative z-10 flex-1 overflow-auto">
      <Header title="Products" />

      <main className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
        <div className="mb-6 flex w-full gap-2">
          {user?.role === ROLES.ADMIN ||
            (user?.role === ROLES.SUPER_ADMIN && (
              <Link href="/admin/products/create">Create Product</Link>
            ))}
          <DownloadCSV csvData={products.data} />
        </div>
        {/* STATS */}

        {requestedProducts.length > 0 ? (
          <RequestedProductsTable
            products={requestedProducts.map((product) => ({
              ...product,
              createdAt: product.createdAt.toISOString(),
            }))}
            page={page}
            totalPages={totalPages}
            removeRequestedProductAction={async (requestedProductId) => {
              "use server";
              await removeRequestedProductFromContributor({
                user,
                contributorId: contributor?.id ?? undefined,
                requestedProductId,
              });
            }}
          />
        ) : (
          <ProductsTable
            products={products.data || []}
            page={page}
            totalPages={products.totalPages}
          />
        )}
      </main>
    </div>
  );
};
export default ProductsPage;
