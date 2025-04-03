import { auth } from "@/auth";
import UsersTable from "@/components/admin/users/UsersTable";
import DownloadCSV from "@/components/shared/download-csv";
import { getAllUsersByRoleAndContributor } from "@/core/actions/admin/admin.actions";
import { getOrderSummary } from "@/core/actions/order/order.action";
import ROLES from "@/lib/constants/roles";
import { Role } from "@prisma/client";
import Link from "next/link";
import UsersCard from "../users-card";

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

  console.log("searchParams", session?.user.role);

  const usersResponse = await getAllUsersByRoleAndContributor({
    currentUserId: session?.user.id ?? "",
    currentUserRole: (Object.values(ROLES) as string[]).includes(
      session?.user.role ?? ""
    )
      ? (session?.user.role as Role)
      : ROLES.USER,
    query: searchQuery,
    page: page,
    limit: 10,
  });

  const summaryResponse = await getOrderSummary();

  const users = usersResponse.data.filter(
    (user: { id: string }) => user.id !== session?.user.id
  );
  const summary = summaryResponse;

  return (
    <div className="relative z-10 flex-1 overflow-auto">
      <main className="mx-auto max-w-7xl px-4 py-6 lg:px-8 ">
        <div className="mb-4 flex gap-2">
          <Link href="/admin/users/create">Create User</Link>
          <DownloadCSV csvData={users} />
        </div>
        {/* STATS */}
        <UsersCard userStats={userStats} summary={summary} users={users} />

        <UsersTable users={users} />
      </main>
    </div>
  );
};
export default UsersPage;
