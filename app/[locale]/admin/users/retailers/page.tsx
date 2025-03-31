import { auth } from "@/auth";
import Header from "@/components/admin/common/Header";
import UserActivityHeatmap from "@/components/admin/users/UserActivityHeatmap";
import UserDemographicsChart from "@/components/admin/users/UserDemographicsChart";
import UserGrowthChart from "@/components/admin/users/UserGrowthChart";
import UsersTable from "@/components/admin/users/UsersTable";
import CardWorking from "@/components/dev/card-working";
import DownloadCSV from "@/components/shared/download-csv";
import { getAllUsers } from "@/core/actions/admin/admin.actions";
import { getOrderSummary } from "@/core/actions/order/order.action";
import ROLES from "@/lib/constants/roles";
import Link from "next/link";
import UsersCard from "../users-card";

const userStats = {
  totalUsers: 152845,
  newUsersToday: 243,
  activeUsers: 98520,
  churnRate: "2.4%",
};

const RetailersPage = async (props: {
  searchParams: Promise<{
    query: string;
    page: string;
    users: string;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const session = await auth();

  const page = Number(searchParams.page) || 1;
  const searchQuery = searchParams.query || "";

  const usersResponse = await getAllUsers({
    role: ROLES.RETAILER,
    query: searchQuery,
    page,
    limit: 10,
  });

  const summaryResponse = await getOrderSummary();

  const users = usersResponse.data.filter(
    (user: { id: string }) => user.id !== session?.user.id
  );
  const summary = summaryResponse;

  return (
    <div className="relative z-10 flex-1 overflow-auto">
      <Header title="Retailers" />

      <main className="mx-auto max-w-7xl px-4 py-6 lg:px-8 ">
        <div className="mb-4 flex gap-2">
          <Link href="/admin/users/create">Create User</Link>
          <DownloadCSV csvData={users} />
        </div>
        {/* STATS */}
        <UsersCard userStats={userStats} summary={summary} users={users} />

        <UsersTable users={users} />

        {/* USER CHARTS */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <UserGrowthChart users={users} />
          <CardWorking>
            <UserActivityHeatmap />
          </CardWorking>
          <CardWorking>
            <UserDemographicsChart />
          </CardWorking>
        </div>
      </main>
    </div>
  );
};
export default RetailersPage;
