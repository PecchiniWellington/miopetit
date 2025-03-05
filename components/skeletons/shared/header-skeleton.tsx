import { Skeleton } from "@/components/ui/skeleton";

const HeaderSkeleton = () => {
  return (
    <header className="w-full shadow-md">
      {/* 🔔 Banner Promozionale */}
      <Skeleton className="h-8 w-full animate-pulse bg-gradient-to-r from-indigo-500 to-purple-600" />

      {/* 📌 Header Principale */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 ">
        <div className="md:wrapper flex items-center justify-between px-4 py-3">
          {/* 🍔 Menu Mobile */}
          <Skeleton className="size-10 animate-pulse rounded-full bg-gray-300 md:hidden" />

          {/* 🏠 Logo */}
          <Skeleton className="h-10 w-40 animate-pulse bg-gray-300" />
          <div className="hidden items-center px-4 py-3 md:flex">
            <Skeleton className="h-8 w-64 animate-pulse bg-gray-300" />
          </div>

          {/* 🛒 Carrello + Utente */}
          <div className="flex items-center gap-4">
            <Skeleton className="size-8 animate-pulse rounded-full bg-gray-300" />
            <Skeleton className="size-8 animate-pulse rounded-full bg-gray-300" />
            <Skeleton className="size-8 animate-pulse rounded-full bg-gray-300" />
          </div>
        </div>
      </div>

      {/* 🔍 Barra di Ricerca */}
      <div className="flex items-center px-4 py-3 md:hidden">
        <Skeleton className="h-8 w-full animate-pulse bg-gray-300" />
      </div>

      {/* Mega Menu */}
      <div className="relative z-20 gap-6 bg-white shadow-md">
        <nav className="wrapper relative z-20 hidden gap-6 bg-white md:flex">
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <Skeleton
                key={index}
                className="h-12 w-32 animate-pulse rounded-md bg-gray-300"
              />
            ))}
        </nav>
      </div>
    </header>
  );
};

export default HeaderSkeleton;
