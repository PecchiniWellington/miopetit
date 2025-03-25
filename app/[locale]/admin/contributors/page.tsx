import Header from "@/components/admin/common/Header";

import SalesTrendChart from "@/components/admin/products/SalesTrendChart";
import { getAllContributors } from "@/core/actions/contributors/get-all-contributors";
import { getAllCategories } from "@/core/actions/products/product-infos.ts/get-product-category.action";
import Link from "next/link";
import ContributorsTable from "./contributors-table";

const ContributorsPage = async (props: {
  searchParams: Promise<{
    query: string;
    page: string;
    category: string;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const searchQuery = searchParams.query || "";

  const contributors = await getAllContributors();

  const categories = await getAllCategories();

  console.log("categories", categories);

  return (
    <div className="relative z-10 flex-1 overflow-auto">
      <Header title="Contributors" />

      <main className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
        <div className="mb-6 flex w-full gap-2">
          <Link href="/admin/contributors/create">Create Product</Link>
          {/* <DownloadCSV csvData={contributors.data} /> */}
        </div>
        {/* STATS */}

        <ContributorsTable
          contributors={contributors}
          page={1}
          totalPages={1}
          /* totalPages={contributors.totalPages} */
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
export default ContributorsPage;
