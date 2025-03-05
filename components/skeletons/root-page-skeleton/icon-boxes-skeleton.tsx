import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const IconBoxesSkeleton = () => {
  return (
    <Card className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
      <CardContent className="grid gap-6 md:grid-cols-4">
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-3 rounded-lg p-4 text-center"
            >
              <Skeleton className="size-12 animate-pulse rounded-full bg-gradient-to-r from-indigo-500 to-purple-600" />
              <Skeleton className="h-6 w-24 animate-pulse bg-gradient-to-r from-indigo-500 to-purple-600" />
              <Skeleton className="h-4 w-32 animate-pulse bg-gradient-to-r from-indigo-500 to-purple-600" />
            </div>
          ))}
      </CardContent>
    </Card>
  );
};

export default IconBoxesSkeleton;
