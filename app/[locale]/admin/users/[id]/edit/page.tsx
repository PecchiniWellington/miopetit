import UserForm from "@/components/admin/users/user-form";
import { getUserById } from "@/core/actions/user";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin User Detail",
  description: "Admin User Detail Page",
};

const AdminUserDetailPage = async (props: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await props.params;

  const user = await getUserById(id);

  if (!user) notFound();

  return (
    <div className="relative z-10 mx-auto  max-w-7xl flex-1 space-y-8 px-4 py-6 lg:px-8">
      <UserForm user={user} type="Update" />
    </div>
  );
};

export default AdminUserDetailPage;
