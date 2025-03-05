import { Skeleton } from "@/components/ui/skeleton";

const TopBarSkeleton = () => {
  return (
    <div className="flex w-full items-center justify-between bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2">
      {/* Skeleton per il messaggio di spedizione gratuita */}
      <span className="wrapper flex items-center justify-between space-x-4">
        <Skeleton className="h-4 w-1/5 animate-pulse bg-gray-300" />

        {/* Skeleton per le icone di assistenza e stato ordini */}
        <div className="flex gap-4">
          <Skeleton className="h-4 w-16 animate-pulse bg-gray-300" />
          <Skeleton className="h-4 w-16 animate-pulse bg-gray-300" />
        </div>
      </span>
    </div>
  );
};

export default TopBarSkeleton;
