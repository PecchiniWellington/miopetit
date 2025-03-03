import Header from "@/components/admin/common/Header";
import DailyOrders from "@/components/admin/orders/DailyOrders";
import OrderDistribution from "@/components/admin/orders/OrderDistribution";
import OrdersTable from "@/components/admin/orders/OrdersTable";
import CardWorking from "@/components/dev/card-working";
import { getAllOrders } from "@/core/actions/admin/admin.actions";
import OrderCards from "./order-card";

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
    <div className="relative z-10 flex-1 overflow-auto">
      <Header title={"Orders"} />

      <main className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
        <CardWorking>
          <OrderCards orderStats={orderStats} />
        </CardWorking>

        <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
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
