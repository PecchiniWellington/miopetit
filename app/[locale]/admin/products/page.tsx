import Header from "@/components/admin/common/Header";

import ProductsTable from "@/components/admin/products/ProductsTable";
import SalesTrendChart from "@/components/admin/products/SalesTrendChart";
import DownloadCSV from "@/components/shared/download-csv";
import { getAllProducts } from "@/core/actions/products";
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

  const products = await getAllProducts({
    query: searchQuery,
    page,
    limit: 10,
  });

  console.log("PRoducts", products);
  return (
    <div className="relative z-10 flex-1 overflow-auto">
      <Header title="Products" />

      <main className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
        <div className="mb-6 flex w-full gap-2">
          <Link href="/admin/products/create">Create Product</Link>
          <DownloadCSV csvData={products.data} />
        </div>
        {/* STATS */}

        <ProductsTable
          products={products.data}
          page={page}
          totalPages={products.totalPages}
        />

        {/* CHARTS */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <SalesTrendChart />

          {/* <CategoryDistributionChart categories={categories} /> */}
        </div>
      </main>
    </div>
  );
};
export default ProductsPage;
