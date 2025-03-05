import { Skeleton } from "@/components/ui/skeleton";

const CategoryNavSkeleton = ({ num = 3 }: { num: number }) => {
  return (
    <div className=" w-full border-t border-gray-200 bg-white  py-4 text-left shadow-lg">
      <div className="wrapper flex justify-start space-x-6">
        {Array(num)
          .fill(0)
          .map((_, index) => (
            <Skeleton
              key={index}
              className="h-6 w-32 animate-pulse rounded-md bg-gradient-to-r from-indigo-500 to-purple-600"
            />
          ))}
      </div>
    </div>
  );
};

export default CategoryNavSkeleton;
