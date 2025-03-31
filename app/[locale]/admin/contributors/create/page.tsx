import { Metadata } from "next";
import ContributorForm from "../ContributorForm";

export const metadata: Metadata = {
  title: "Update Contributor",
  description: "Admin Contributor Update",
};

const AdminContributorUpdatePage = async () => {
  return (
    <div className="relative z-10 mx-auto max-w-7xl flex-1 space-y-8 overflow-auto px-4 py-6 lg:px-8">
      <h1 className="h2-bold">Update Contributor</h1>
      <ContributorForm type="Create" />
    </div>
  );
};

export default AdminContributorUpdatePage;
