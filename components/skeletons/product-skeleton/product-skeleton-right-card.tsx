import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ProductCardSkeleton = () => {
  return (
    <Card className="w-full max-w-sm rounded-lg border bg-white shadow-lg dark:bg-gray-800 md:max-w-md lg:max-w-lg">
      <CardContent className="flex flex-col gap-2 space-y-6 p-6">
        {/* Prezzo */}
        <div className="flex items-center justify-between text-lg font-semibold">
          <Skeleton className="h-6 w-20 animate-pulse bg-gradient-to-r from-indigo-500 to-purple-600" />
          <Skeleton className="ml-2 h-8 w-16 animate-pulse bg-gradient-to-r from-indigo-500 to-purple-600" />
        </div>

        {/* Disponibilità */}
        <div className=" flex items-center justify-between text-lg font-semibold">
          <Skeleton className="h-6 w-24 animate-pulse bg-gradient-to-r from-indigo-500 to-purple-600" />
        </div>

        {/* Pulsante Aggiungi al Carrello */}
        <div className="mt-4 flex w-full justify-center">
          <Skeleton className="h-10 w-full animate-pulse rounded-md bg-gradient-to-r from-indigo-500 to-purple-600" />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCardSkeleton;
