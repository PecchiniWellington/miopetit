import DailyOrders from "@/components/admin/orders/DailyOrders";
import OrderDistribution from "@/components/admin/orders/OrderDistribution";
import OrdersTable from "@/components/admin/orders/OrdersTable";
import Header from "@/components/admin/common/Header";
import OrderCards from "./order-card";
import { getAllOrders } from "@/lib/actions/admin/admin.actions";
import CardWorking from "@/components/dev/card-working";

const orderStats = {
  totalOrders: "1,234",
  pendingOrders: "56",
  completedOrders: "1,178",
  totalRevenue: "$98,765",
};

const OrdersPage = async (props: {
  searchParams: Promise<{ page: string; query: string }>;
}) => {
  const { page = "1", query: searchText } = await props.searchParams;
  const ordersResponse = await getAllOrders({
    page: Number(page),
    query: searchText,
  });
  const orders = JSON.parse(JSON.stringify(ordersResponse));
  return (
    <div className="flex-1 relative z-10 overflow-auto">
      <Header title={"Orders"} />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <CardWorking>
          <OrderCards orderStats={orderStats} />
        </CardWorking>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <CardWorking>
            <DailyOrders />
          </CardWorking>
          <CardWorking>
            <OrderDistribution />
          </CardWorking>
        </div>

        <OrdersTable orders={orders} />
      </main>
    </div>
  );
};
export default OrdersPage;
