import { auth } from "@/auth";
import AnimalForm from "@/components/admin/animals/animals-form";
import { getAnimalById } from "@/core/actions/admin/animals/get-animal-by-id.action";
import { getContributorByUserId } from "@/core/actions/contributors/get-contributor-by-user-id";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin User Detail",
  description: "Admin User Detail Page",
};

const AdminAnimalDetailPage = async (props: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await props.params;
  const animal = await getAnimalById(id);

  const currentUser = await auth();
  const currentContributor = await getContributorByUserId(
    currentUser?.user.id as string
  );

  console.log("currentContributor", animal);

  const folder = `${currentContributor?.type}/${currentContributor?.slug}`;
  if (!animal) notFound();

  return (
    <div className="relative z-10 mx-auto  max-w-7xl flex-1 space-y-8 px-4 py-6 lg:px-8">
      <AnimalForm animal={animal} type="Update" folder={folder} />
    </div>
  );
};

export default AdminAnimalDetailPage;
