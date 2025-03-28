import { auth } from "@/auth";
import { getAllUsers } from "@/core/actions/admin/admin.actions";
import { getContributorById } from "@/core/actions/contributors/get-contributor-by-id";
import ROLES from "@/lib/constants/roles";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ContributorForm from "../../ContributorForm";

export const metadata: Metadata = {
  title: "Update Contributor",
  description: "Admin Contributor Update",
};

const AdminContributorUpdatePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const contributorData = await getContributorById(id);
  if (!contributorData) return notFound();

  const contributor = {
    ...contributorData,
    createdAt: contributorData.createdAt?.toISOString(),
    updatedAt: contributorData.updatedAt?.toISOString(),
    openingHours:
      contributorData.openingHours &&
      typeof contributorData.openingHours === "object"
        ? JSON.stringify(contributorData.openingHours)
        : contributorData.openingHours &&
            typeof contributorData.openingHours === "string"
          ? contributorData.openingHours
          : null,
    socialLinks:
      typeof contributorData.socialLinks === "string"
        ? JSON.parse(contributorData.socialLinks)
        : contributorData.socialLinks,
  };

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
        type="Update"
        users={users.data}
        isAdmin={data?.user.role === ROLES.ADMIN}
        contributorId={id}
        contributor={contributor}
      />
    </div>
  );
};

export default AdminContributorUpdatePage;
