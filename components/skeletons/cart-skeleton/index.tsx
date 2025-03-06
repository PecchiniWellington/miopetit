import { Skeleton } from "@/components/ui/skeleton";

const CartSkeleton = () => {
  return (
    <div className="w-full">
      <Skeleton className="mb-6 h-10 w-60 animate-pulse bg-gradient-to-r from-indigo-500 to-purple-600" />
      <div className="flex w-full items-center justify-between ">
        {/* Titolo */}

        <div className="mr-6 flex w-full flex-col space-y-6">
          {/* Intestazione tabella */}
          <div className="mb-4 grid w-full grid-cols-3 text-center">
            <Skeleton className="h-6 w-32 animate-pulse bg-gray-300" />
            <Skeleton className="h-6 w-32 animate-pulse bg-gray-300" />
            <Skeleton className="h-6 w-32 animate-pulse bg-gray-300" />
          </div>

          {/* Elementi del carrello */}
          <div className="w-full  space-y-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="grid grid-cols-3 items-center gap-4 rounded-lg border border-gray-200 p-4 shadow-md"
              >
                {/* Immagine */}
                <Skeleton className="size-16 animate-pulse rounded-lg bg-gray-300" />

                {/* Info prodotto */}
                <div className="flex flex-col space-y-2">
                  <Skeleton className="h-5 w-32 animate-pulse bg-gray-300" />
                  <Skeleton className="h-4 w-24 animate-pulse bg-gray-200" />
                </div>

                {/* Quantità e rimuovi */}
                <div className="flex items-center justify-center space-x-4">
                  <Skeleton className="size-10 animate-pulse rounded-full bg-gradient-to-r from-indigo-500 to-purple-600" />
                  <Skeleton className="h-6 w-10 animate-pulse bg-gray-200" />
                  <Skeleton className="size-10 animate-pulse rounded-full bg-gradient-to-r from-indigo-500 to-purple-600" />
                  <div className="flex items-center justify-center space-x-4">
                    <Skeleton className="size-10 animate-pulse rounded-full bg-gray-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Riepilogo ordine */}
        <div className="mt-10 w-full max-w-xs rounded-lg border border-gray-200 bg-white p-6 shadow-md">
          <Skeleton className="mb-4 h-6 w-40 animate-pulse bg-gray-300" />
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex justify-between py-2">
              <Skeleton className="h-4 w-24 animate-pulse bg-gray-200" />
              <Skeleton className="h-4 w-16 animate-pulse bg-gray-200" />
            </div>
          ))}

          <div className="mt-4 flex justify-between border-t pt-4">
            <Skeleton className="h-5 w-32 animate-pulse bg-gray-300" />
            <Skeleton className="h-5 w-20 animate-pulse bg-gray-300" />
          </div>

          <Skeleton className="mt-6 h-12 w-full animate-pulse rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600" />
        </div>
      </div>
    </div>
  );
};

export default CartSkeleton;
