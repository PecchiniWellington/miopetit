"use server";
import { auth } from "@/auth";
import AnimalsTable from "@/components/admin/animals/animals-table";
import Header from "@/components/admin/common/Header";
import { getAnimalsByContributorWithFilters } from "@/core/actions/admin/animals/get-all-animals-by-contributor.action";
import { getContributorByUserId } from "@/core/actions/contributors/get-contributor-by-user-id";

const DogPage = async (props: {
  searchParams: Promise<{
    query: string;
    page: string;
    users: string;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const session = await auth();
  const contributor = await getContributorByUserId(session?.user.id);
  const contributorId = contributor?.id || "";

  const page = Number(searchParams.page) || 1;
  const searchQuery = searchParams.query || "";

  const usersResponse = await getAnimalsByContributorWithFilters({
    contributorId: contributorId,
    animalType: "dog", // es: "cani", "gatti", "roditori"
    search: searchQuery,
    page,
    pageSize: 10,
  });

  const users = usersResponse.data.filter(
    (user: { id: string }) => user.id !== session?.user.id
  );

  return (
    <div className="relative z-10 flex-1 overflow-auto">
      <Header title="Admins" />

      <main className="mx-auto max-w-7xl px-4 py-6 lg:px-8 ">
        <AnimalsTable animals={users} />
      </main>
    </div>
  );
};
export default DogPage;
