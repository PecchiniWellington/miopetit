import DownloadCSV from "@/app/admin-test/categories/download-csv";
import { auth } from "@/auth";
import Header from "@/components/admin/common/Header";
import UserActivityHeatmap from "@/components/admin/users/UserActivityHeatmap";
import UserDemographicsChart from "@/components/admin/users/UserDemographicsChart";
import UserGrowthChart from "@/components/admin/users/UserGrowthChart";
import UsersTable from "@/components/admin/users/UsersTable";
import CardWorking from "@/components/dev/card-working";
import DynamicButton from "@/components/dynamic-button";
import { getAllUsers } from "@/core/actions/admin/admin.actions";
import { getOrderSummary } from "@/core/actions/order/order.action";
import { IUser } from "@/types";
import Link from "next/link";
import UsersCard from "./users-card";

const userStats = {
  totalUsers: 152845,
  newUsersToday: 243,
  activeUsers: 98520,
  churnRate: "2.4%",
};

const UsersPage = async (props: {
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
    query: searchQuery,
    page,
    limit: 100,
  });

  const summaryResponse = await getOrderSummary();

  const users = JSON.parse(JSON.stringify(usersResponse));
  const summary = JSON.parse(JSON.stringify(summaryResponse));

  // remove user logged in from the list
  users.data = users.data.filter(
    (user: IUser) => user.id !== session?.user?.id
  );

  return (
    <div className="relative z-10 flex-1 overflow-auto">
      <Header title="Users" />

      <main className="mx-auto max-w-7xl px-4 py-6 lg:px-8 ">
        <div className="mb-4 flex gap-2">
          <DynamicButton>
            <Link href="/admin/users/create">Create User</Link>
          </DynamicButton>
          <DownloadCSV csvData={users.data} />
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
export default UsersPage;
