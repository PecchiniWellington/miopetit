import Header from "@/components/admin/common/Header";
import SalesOverviewChart from "@/components/admin/overview/SalesOverviewChart";
import CategoryDistributionChart from "@/components/admin/overview/CategoryDistributionChart";
import SalesChannelChart from "@/components/admin/overview/SalesChannelChart";
import { getAllCategories } from "@/lib/actions/admin/admin.actions";
import OverviewCard from "./overview-card";

const OverviewPage = async () => {
  const categories = await getAllCategories();
  const categoriesDistribution = JSON.parse(JSON.stringify(categories));

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Overview" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* STATS */}
        <OverviewCard />

        {/* CHARTS */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SalesOverviewChart />
          <CategoryDistributionChart
            categoriesDistribution={categoriesDistribution}
          />
          <SalesChannelChart />
        </div>
      </main>
    </div>
  );
};
export default OverviewPage;
