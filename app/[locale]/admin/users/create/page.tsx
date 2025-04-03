import { auth } from "@/auth";
import UserForm from "@/components/admin/users/user-form";
import { getContributorByUserId } from "@/core/actions/contributors/get-contributor-by-user-id";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin User Detail",
  description: "Admin User Detail Page",
};

const AdminUserCreatePage = async (props: {
  params: Promise<{ id: string }>;
}) => {
  const currentUser = await auth();
  const currentContributor = await getContributorByUserId(
    currentUser?.user.id as string
  );

  const folder = `${currentContributor?.type}/${currentContributor?.slug}`;

  return (
    <div className="relative z-10 mx-auto  max-w-7xl flex-1 space-y-8 px-4 py-6 lg:px-8">
      <UserForm type="Create" folder={folder} />
    </div>
  );
};

export default AdminUserCreatePage;
