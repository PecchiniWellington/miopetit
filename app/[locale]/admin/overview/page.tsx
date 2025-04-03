import SalesChannelChart from "@/components/admin/overview/SalesChannelChart";
import SalesOverviewChart from "@/components/admin/overview/SalesOverviewChart";
import OverviewCard from "./overview-card";

const OverviewPage = async () => {
  /*  const categories = await getAllCategories();
  const categoriesDistribution = JSON.parse(JSON.stringify(categories)); */

  return (
    <div className="relative z-10 flex-1 overflow-auto">
      <main className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
        {/* STATS */}
        <OverviewCard />

        {/* CHARTS */}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <SalesOverviewChart />
          {/*  <CategoryDistributionChart
            categoriesDistribution={categoriesDistribution}
          /> */}
          <SalesChannelChart />
        </div>
      </main>
    </div>
  );
};
export default OverviewPage;
