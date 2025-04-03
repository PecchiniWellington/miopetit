import { auth } from "@/auth";
import UsersTable from "@/components/admin/users/UsersTable";
import DownloadCSV from "@/components/shared/download-csv";
import { getContributorUsersByRole } from "@/core/actions/contributors/get-contributors-users-by-role.action";
import { getOrderSummary } from "@/core/actions/order/order.action";
import ROLES from "@/lib/constants/roles";
import Link from "next/link";

const userStats = {
  totalUsers: 152845,
  newUsersToday: 243,
  activeUsers: 98520,
  churnRate: "2.4%",
};

const VeterinariansPage = async (props: {
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

  if (!session) {
    throw new Error("Session is null. User must be authenticated.");
  }

  const users = await getContributorUsersByRole({
    userId: session.user.id || "",
    role: ROLES.VETERINARIAN,
    query: searchQuery,
    page: page,
    limit: 10,
  });

  const summary = await getOrderSummary();

  return (
    <div className="relative z-10 flex-1 overflow-auto">
      <main className="mx-auto max-w-7xl px-4 py-6 lg:px-8 ">
        <div className="mb-4 flex gap-2">
          <Link href="/admin/users/create">Create User</Link>
          <DownloadCSV csvData={users.data} />
        </div>
        {/* STATS */}

        <UsersTable users={users.data} />
      </main>
    </div>
  );
};
export default VeterinariansPage;
