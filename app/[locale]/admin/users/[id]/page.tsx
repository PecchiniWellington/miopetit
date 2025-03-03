import { getUserById } from "@/core/actions/user";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import UpdateUserForm from "./update-user-form";

export const metadata: Metadata = {
  title: "Admin User Detail",
  description: "Admin User Detail Page",
};

const AdminUserDetailPage = async (props: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await props.params;

  let user = await getUserById(id);

  if (
    user &&
    (!user.defaultAddress || typeof user.defaultAddress !== "object")
  ) {
    user = {
      ...user,
      defaultAddress: {
        fullName: "",
        street: "",
        city: "",
        postalCode: "",
        country: "",
        id: undefined,
        userId: undefined,
        isDefault: undefined,
      },
    };
  }

  if (!user) notFound();

  return (
    <div className="relative z-10 mx-auto  max-w-7xl flex-1 space-y-8 px-4 py-6 lg:px-8">
      <h1 className="h2-bold">Update User</h1>
      <UpdateUserForm user={user} />
    </div>
  );
};

export default AdminUserDetailPage;
