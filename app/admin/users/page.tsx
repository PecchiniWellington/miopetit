import { Badge } from "lucide-react";

import Header from "@/components/admin/common/Header";
import UsersTable from "@/components/admin/users/UsersTable";
import UserGrowthChart from "@/components/admin/users/UserGrowthChart";
import UserActivityHeatmap from "@/components/admin/users/UserActivityHeatmap";
import UserDemographicsChart from "@/components/admin/users/UserDemographicsChart";
import UsersCard from "./users-card";
import { auth } from "@/auth";
import { getAllUsers } from "@/lib/actions/admin/admin.actions";
import DownloadCSV from "@/app/admin-test/categories/download-csv";
import DynamicButton from "@/components/dynamic-button";
import Link from "next/link";
import { getOrderSummary } from "@/lib/actions/order/order.action";
import CardWorking from "@/components/dev/card-working";

const userStats = {
  totalUsers: 152845,
  newUsersToday: 243,
  activeUsers: 98520,
  churnRate: "2.4%",
};

const UsersPage = async (props: {
  searchParams: {
    query: string;
    page: string;
    users: string;
  };
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
  users.data = users.data.filter((user: any) => user.id !== session?.user?.id);

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Users" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8 ">
        <div className="flex gap-2 mb-4">
          <DynamicButton>
            <Link href="/admin/users/create">Create User</Link>
          </DynamicButton>
          <DownloadCSV csvData={users.data} />
        </div>
        {/* STATS */}
        <UsersCard userStats={userStats} summary={summary} users={users} />

        <UsersTable users={users} />

        {/* USER CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
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
