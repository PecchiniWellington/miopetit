import RootPageSkeleton from "@/components/skeletons/root-page-skeleton";
import HeaderSkeleton from "@/components/skeletons/root-page-skeleton/header-skeleton";

const Loading = () => {
  return (
    <div className="flex h-screen flex-col">
      <HeaderSkeleton />
      <main className=" wrapper my-10 flex-1">
        <RootPageSkeleton />
      </main>
    </div>
  );
};

export default Loading;
