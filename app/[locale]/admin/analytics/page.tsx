import AIPoweredInsights from "@/components/admin/analytics/AIPoweredInsights";
import ChannelPerformance from "@/components/admin/analytics/ChannelPerformance";
import CustomerSegmentation from "@/components/admin/analytics/CustomerSegmentation";
import OverviewCards from "@/components/admin/analytics/OverviewCards";
import ProductPerformance from "@/components/admin/analytics/ProductPerformance";
import RevenueChart from "@/components/admin/analytics/RevenueChart";
import UserRetention from "@/components/admin/analytics/UserRetention";
import Header from "@/components/admin/common/Header";

const AnalyticsPage = () => {
  return (
    <div className="relative z-10 flex-1 overflow-auto bg-gray-900">
      <Header title={"Analytics Dashboard"} />

      <main className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
        <OverviewCards />
        <RevenueChart />

        <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
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
