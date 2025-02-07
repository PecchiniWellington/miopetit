import { auth } from "@/auth";
import LayoutTitle from "@/components/layout-title";
import TinyBarChart from "@/components/shared/charts/tiny-bar-chart";
import { getOrderSummary } from "@/core/actions/order/order.action";
import ROLES from "@/lib/constants/roles";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { BadgeDollarSign, Barcode, CreditCard, Users } from "lucide-react";
import { Metadata } from "next";
import OverviewCard from "./overview-card";
import RecentSalesTable from "./recent-sales-table";

export const metadata: Metadata = {
  title: "Admin Dashboard Overview",
};

const AdminOverviewPage = async () => {
  const session = await auth();

  if (session?.user?.role !== ROLES.ADMIN) {
    throw new Error("Unauthorized");
  }

  const summary = await getOrderSummary();

  return (
    <div className="space-y-2">
      <LayoutTitle title="Dashboard" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <OverviewCard icon={<BadgeDollarSign />} title="Total Revenue">
          {formatCurrency(
            summary.totalSales._sum.totalPrice?.toString() || "0"
          )}
        </OverviewCard>
        <OverviewCard icon={<CreditCard />} title="Sales">
          {formatNumber(summary.ordersCount)}
        </OverviewCard>
        <OverviewCard icon={<Users />} title="Customers">
          {formatNumber(summary.usersCount)}
        </OverviewCard>
        <OverviewCard icon={<Barcode />} title="Products">
          {formatNumber(summary.productsCount)}
        </OverviewCard>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <OverviewCard title="Overview" className="col-span-4">
          <TinyBarChart data={{ salesData: summary.salesData }} />
        </OverviewCard>
        <OverviewCard title="Recent Sales" className="col-span-3">
          <RecentSalesTable summary={summary.latestSales} />
        </OverviewCard>
      </div>
    </div>
  );
};

export default AdminOverviewPage;
