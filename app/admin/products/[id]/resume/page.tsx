import Header from "@/components/admin/common/Header";

import SalesTrendChart from "@/components/admin/products/SalesTrendChart";
import { getProductById } from "@/lib/actions/product.actions";

import OrderDistribution from "@/components/admin/orders/OrderDistribution";
import UserDemographicsChart from "@/components/admin/users/UserDemographicsChart";
import ProductResumeCard from "./products-resume-card";

const ProductsOverviewPage = async (props: {
  searchParams: Promise<{
    query: string;
    page: string;
    category: string;
  }>;
  params: Promise<{ id: string }>;
}) => {
  const { id } = await props.params;

  const productsResponse = await getProductById(id);

  const product = JSON.parse(JSON.stringify(productsResponse));

  return (
    <div className="relative z-10 flex-1 overflow-auto">
      <Header title="Products" />

      <main className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
        {/* STATS */}
        <ProductResumeCard product={product} />

        {/* PRODUCT DETAIL */}

        {/* CHARTS */}
        <div className=" mb-8">
          <SalesTrendChart product={product} />
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <UserDemographicsChart />
          <OrderDistribution />
        </div>
      </main>
    </div>
  );
};
export default ProductsOverviewPage;
