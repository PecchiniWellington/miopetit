import AIPoweredInsights from "@/components/admin-2/analytics/AIPoweredInsights";
import ChannelPerformance from "@/components/admin-2/analytics/ChannelPerformance";
import CustomerSegmentation from "@/components/admin-2/analytics/CustomerSegmentation";
import OverviewCards from "@/components/admin-2/analytics/OverviewCards";
import ProductPerformance from "@/components/admin-2/analytics/ProductPerformance";
import RevenueChart from "@/components/admin-2/analytics/RevenueChart";
import UserRetention from "@/components/admin-2/analytics/UserRetention";
import Header from "@/components/admin-2/common/Header";

const AnalyticsPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10 bg-gray-900">
      <Header title={"Analytics Dashboard"} />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <OverviewCards />
        <RevenueChart />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <ChannelPerformance />
          <ProductPerformance />
          <UserRetention />
          <CustomerSegmentation />
        </div>

        <AIPoweredInsights />
      </main>
    </div>
  );
};
export default AnalyticsPage;
