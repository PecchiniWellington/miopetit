import Header from "@/components/admin/common/Header";

import CategoryDistributionChart from "@/components/admin/overview/CategoryDistributionChart";
import SalesTrendChart from "@/components/admin/products/SalesTrendChart";
import ProductsTable from "@/components/admin/products/ProductsTable";
import { getAllProducts } from "@/lib/actions/product.actions";
import DownloadCSV from "@/app/admin/categories/download-csv";
import DynamicButton from "@/components/dynamic-button";
import ProductCard from "./products-card";
import Link from "next/link";
import { getOrderSummary } from "@/lib/actions/order/order.action";
import CardWorking from "@/components/dev/card-working";
import { getAllCategories } from "@/lib/actions/admin/admin.actions";

const ProductsPage = async (props: {
  searchParams: {
    query: string;
    page: string;
    category: string;
  };
}) => {
  const searchParams = await props.searchParams;

  const page = Number(searchParams.page) || 1;
  const searchQuery = searchParams.query || "";
  const category = searchParams.category || "";

  const productsResponse = await getAllProducts({
    query: searchQuery,
    page,
    category,
  });
  const summary = await getOrderSummary();
  const categories = await getAllCategories();

  const products = JSON.parse(JSON.stringify(productsResponse));
  const overviewSummary = JSON.parse(JSON.stringify(summary));
  const categoriesDistribution = JSON.parse(JSON.stringify(categories));

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Products" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <div className="flex w-full gap-2 mb-6">
          <DynamicButton>
            <Link href="/admin-2/products/create">Create Product</Link>
          </DynamicButton>
          <DownloadCSV csvData={products.data} />
        </div>
        {/* STATS */}
        <ProductCard overviewSummary={overviewSummary} />
        <ProductsTable products={products} />

        {/* CHARTS */}
        <div className="grid grid-col-1 lg:grid-cols-2 gap-8">
          <CardWorking>
            <SalesTrendChart />
          </CardWorking>
          <CategoryDistributionChart
            categoriesDistribution={categoriesDistribution}
          />
        </div>
      </main>
    </div>
  );
};
export default ProductsPage;
