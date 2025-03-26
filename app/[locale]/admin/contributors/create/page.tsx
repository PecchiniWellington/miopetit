import { auth } from "@/auth";
import { getAllUsers } from "@/core/actions/admin/admin.actions";
import ROLES from "@/lib/constants/roles";
import { Metadata } from "next";
import ContributorForm from "../ContributorForm";

export const metadata: Metadata = {
  title: "Update Contributor",
  description: "Admin Contributor Update",
};

const AdminContributorUpdatePage = async () => {
  const users = await getAllUsers({ query: "all", limit: 10, page: 1 });
  const data = await auth();
  console.log(
    "🚀 ~ file: page.tsx ~ line 8 ~ AdminContributorUpdatePage ~ data",
    users
  );
  return (
    <div className="relative z-10 mx-auto max-w-7xl flex-1 space-y-8 overflow-auto px-4 py-6 lg:px-8">
      <h1 className="h2-bold">Update Contributor</h1>
      <ContributorForm
        type="Create"
        users={users.data}
        isAdmin={data?.user.role === ROLES.ADMIN}
      />
    </div>
  );
};

export default AdminContributorUpdatePage;
