import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ProductDetailsSkeleton = () => {
  return (
    <div className="col-span-2 flex flex-col space-y-4 px-6">
      {/* Punti fedeltà */}
      <Skeleton className="h-6 w-32 animate-pulse bg-gradient-to-r from-indigo-500 to-purple-600" />

      {/* Brand */}
      <Skeleton className="mt-4 h-4 w-24 animate-pulse bg-gradient-to-r from-indigo-500 to-purple-600" />

      {/* Titolo del prodotto */}
      <Skeleton className="mt-2 h-8 w-3/4 animate-pulse bg-gradient-to-r from-indigo-500 to-purple-600" />

      {/* Recensioni */}
      <div className="mt-2 flex items-center gap-2">
        <Skeleton className="h-6 w-32 animate-pulse bg-gradient-to-r from-indigo-500 to-purple-600" />
        <Skeleton className="h-4 w-12 animate-pulse bg-gradient-to-r from-indigo-500 to-purple-600" />
      </div>

      {/* Prezzo */}
      <div className="mt-4 border-t pt-4">
        <Skeleton className="h-6 w-40 animate-pulse bg-gradient-to-r from-indigo-500 to-purple-600" />
        <div className="mt-4 flex items-baseline gap-2">
          <Skeleton className="h-8 w-20 animate-pulse bg-gradient-to-r from-indigo-500 to-purple-600" />
          <Skeleton className="h-6 w-16 animate-pulse bg-gradient-to-r from-indigo-500 to-purple-600" />
          <Skeleton className="mt-4 h-6 w-24 animate-pulse bg-gradient-to-r from-indigo-500 to-purple-600" />
        </div>
      </div>

      {/* Specifiche prodotto */}
      <div className="mt-12">
        <Skeleton className="h-6 w-48 animate-pulse bg-gradient-to-r from-indigo-500 to-purple-600" />
        <Card className="mt-3">
          <CardContent className="p-0">
            <table className="w-full border-collapse text-sm">
              <tbody>
                {Array(4)
                  .fill(0)
                  .map((_, index) => (
                    <tr key={index} className="border-t last:border-b">
                      <td className="bg-gray-100 px-4 py-2">
                        <Skeleton className="h-4 w-32 animate-pulse bg-gradient-to-r from-indigo-500 to-purple-600" />
                      </td>
                      <td className="px-4 py-2">
                        <Skeleton className="h-4 w-48 animate-pulse bg-gradient-to-r from-indigo-500 to-purple-600" />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
