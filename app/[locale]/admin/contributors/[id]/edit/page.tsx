// app/admin/contributors/[id]/page.tsx

import { getContributorById } from "@/core/actions/contributors/get-contributor-by-id";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ContributorForm from "../../ContributorForm";

export const metadata: Metadata = {
  title: "Update Contributor",
  description: "Admin Contributor Update",
};

const normalizeOpeningHours = (value: unknown) => {
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch {
      return fallbackOpeningHours();
    }
  }

  if (typeof value === "object" && value !== null) return value;
  return fallbackOpeningHours();
};

const fallbackOpeningHours = () => ({
  monday: null,
  tuesday: null,
  wednesday: null,
  thursday: null,
  friday: null,
  saturday: null,
  sunday: null,
});

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
    openingHours: normalizeOpeningHours(contributorData.openingHours),
    socialLinks:
      typeof contributorData.socialLinks === "string"
        ? JSON.parse(contributorData.socialLinks)
        : contributorData.socialLinks,
    users: contributorData.users.map((user) => ({
      ...user,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    })),
  };

  return (
    <div className="relative z-10 mx-auto max-w-7xl flex-1 space-y-8 overflow-auto px-4 py-6 lg:px-8">
      <h1 className="h2-bold">Update Contributor</h1>
      <ContributorForm
        type="Update"
        contributorId={id}
        contributor={contributor}
      />
    </div>
  );
};

export default AdminContributorUpdatePage;
