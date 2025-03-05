import { Skeleton } from "@/components/ui/skeleton";

const SearchUISkeleton = () => {
  return (
    <div className="flex w-full max-w-lg animate-pulse items-center space-x-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 p-2 shadow-md">
      {/* Categoria */}
      <Skeleton className="h-10 w-24 rounded-full bg-gray-300" />
      {/* Input di ricerca */}
      <Skeleton className="h-10 flex-1 rounded-full bg-gray-300" />
      {/* Bottone di ricerca */}
      <Skeleton className="size-10 rounded-full bg-gray-400" />
    </div>
  );
};

export default SearchUISkeleton;
