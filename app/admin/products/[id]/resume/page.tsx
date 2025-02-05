import Header from "@/components/admin/common/Header";

import CategoryDistributionChart from "@/components/admin/overview/CategoryDistributionChart";
import SalesTrendChart from "@/components/admin/products/SalesTrendChart";
import ProductsTable from "@/components/admin/products/ProductsTable";
import { getAllProducts, getProductById } from "@/lib/actions/product.actions";
import DownloadCSV from "@/app/admin-test/categories/download-csv";
import DynamicButton from "@/components/dynamic-button";

import Link from "next/link";
import { getOrderSummary } from "@/lib/actions/order/order.action";
import CardWorking from "@/components/dev/card-working";
import { getAllCategories } from "@/lib/actions/admin/admin.actions";
import ProductResumeCard from "./products-resume-card";
import OrderDistribution from "@/components/admin/orders/OrderDistribution";
import UserDemographicsChart from "@/components/admin/users/UserDemographicsChart";

const ProductsOverviewPage = async (props: {
  searchParams: {
    query: string;
    page: string;
    category: string;
  };
  params: Promise<{ id: string }>;
}) => {
  const searchParams = await props.searchParams;
  const { id } = await props.params;

  const page = Number(searchParams.page) || 1;
  const searchQuery = searchParams.query || "";
  const category = searchParams.category || "";

  const productsResponse = await getProductById(id);
  const summary = await getOrderSummary();
  const categories = await getAllCategories();

  const product = JSON.parse(JSON.stringify(productsResponse));

  const overviewSummary = JSON.parse(JSON.stringify(summary));
  console.log("PRODUCTS OVERVIEW SUMMARY", product);

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Products" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* STATS */}
        <ProductResumeCard product={product} />

        {/* PRODUCT DETAIL */}

        {/* CHARTS */}
        <div className=" mb-8">
          <SalesTrendChart product={product} />
        </div>
        <div className="grid grid-col-1 lg:grid-cols-2 gap-8">
          <UserDemographicsChart />
          <OrderDistribution />
        </div>
      </main>
    </div>
  );
};
export default ProductsOverviewPage;
