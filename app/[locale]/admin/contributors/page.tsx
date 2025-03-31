import Header from "@/components/admin/common/Header";

import { auth } from "@/auth";
import { getAllContributors } from "@/core/actions/contributors/get-all-contributors";
import ROLES from "@/lib/constants/roles";
import Link from "next/link";
import ContributorsTable from "./contributors-table";

const ContributorsPage = async () => {
  const contributors = await getAllContributors();
  const currentUser = await auth();

  return (
    <div className="relative z-10 flex-1 overflow-auto">
      <Header title="Contributors" />

      <main className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
        {currentUser?.user.role === ROLES.ADMIN && (
          <div className="mb-6 flex w-full gap-2">
            <Link href="/admin/contributors/create">Create Contributor</Link>
            {/* <DownloadCSV csvData={contributors.data} /> */}
          </div>
        )}
        <ContributorsTable
          contributors={contributors}
          page={1}
          totalPages={1}
          /* totalPages={contributors.totalPages} */
        />
      </main>
    </div>
  );
};
export default ContributorsPage;
