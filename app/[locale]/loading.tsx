/* "use client";

import CartSkeleton from "@/components/skeletons/cart-skeleton";
import RootPageSkeleton from "@/components/skeletons/root-page-skeleton";
import HeaderSkeleton from "@/components/skeletons/root-page-skeleton/header-skeleton";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Loading = () => {
  const pathName = usePathname();
  const locale = useLocale();
  const lastSegment = pathName.split("/").filter(Boolean).pop();
  const isHome = pathName === `/${locale}`;

  const isRefreshed =
    (
      performance.getEntriesByType(
        "navigation"
      )[0] as PerformanceNavigationTiming
    )?.type === "reload";

  const previousPath =
    typeof window !== "undefined" ? localStorage.getItem("previousPath") : null;

  const [showHeaderSkeleton, setShowHeaderSkeleton] = useState(true);

  useEffect(() => {
    const wasOnHome = previousPath === `/${locale}`;
    const cameFromAnotherPage =
      previousPath !== null && previousPath !== pathName && !wasOnHome;

    if (cameFromAnotherPage) {
      setShowHeaderSkeleton(false);
    } else if (!isHome) {
      setShowHeaderSkeleton(true);
    } else if (isRefreshed && isHome) {
      setShowHeaderSkeleton(true);
    }

    localStorage.setItem("previousPath", pathName);
  }, [pathName, locale]);

  let SkeletonComponent = RootPageSkeleton;
  if (lastSegment === "cart") SkeletonComponent = CartSkeleton;
  else if (lastSegment === "faq") {
    const FaqSkeleton = () => <div>DA FARE</div>;
    FaqSkeleton.displayName = "FaqSkeleton";
    SkeletonComponent = FaqSkeleton;
  } else if (lastSegment === "favorites") {
    const FavoritesSkeleton = () => <div>DA FARE</div>;
    FavoritesSkeleton.displayName = "FavoritesSkeleton";
    SkeletonComponent = FavoritesSkeleton;
  }

  return (
    <div className="flex h-screen flex-col">
      {showHeaderSkeleton && <HeaderSkeleton key={pathName} />}
      <main className="wrapper my-10 flex-1">
        <SkeletonComponent />
      </main>
    </div>
  );
};

export default Loading; */

"use client";

import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <main className="wrapper my-10 flex flex-1 items-center justify-center">
        <Image
          src="/images/loader-2.gif"
          alt="loading"
          width={400}
          height={400}
        />
      </main>
    </div>
  );
};

export default Loading;
