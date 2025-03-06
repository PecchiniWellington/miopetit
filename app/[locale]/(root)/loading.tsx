"use client";

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

  // Controlla se la navigazione è stata un refresh
  const isRefreshed =
    performance.getEntriesByType("navigation")[0]?.type === "reload";

  // 🔹 Recupera il path precedente da localStorage
  const previousPath =
    typeof window !== "undefined" ? localStorage.getItem("previousPath") : null;

  const [showHeaderSkeleton, setShowHeaderSkeleton] = useState(true);

  useEffect(() => {
    console.log("🌍 PREVIOUS PATH:", previousPath);
    console.log("🚀 CURRENT PATH:", pathName);
    console.log("🏠 IS HOME?", isHome);
    console.log("🔄 REFRESH DETECTED?", isRefreshed);

    const wasOnHome = previousPath === `/${locale}`;
    const cameFromAnotherPage =
      previousPath !== null && previousPath !== pathName && !wasOnHome;

    console.log("📍 Came from another page?", cameFromAnotherPage);

    if (cameFromAnotherPage) {
      console.log("✅ SONO QUI 1 - Arrivo alla home da un'altra pagina");
      setShowHeaderSkeleton(false);
    } else if (!isHome) {
      console.log("✅ SONO QUI 2 - Sono su una pagina diversa dalla home");
      setShowHeaderSkeleton(true);
    } else if (isRefreshed && isHome) {
      console.log("✅ SONO QUI 3 - Sono già sulla home e faccio refresh");
      setShowHeaderSkeleton(true);
    }

    // 🔄 Aggiorna `previousPath` su localStorage per il prossimo cambio di pagina
    localStorage.setItem("previousPath", pathName);
  }, [pathName, locale]);

  // 🔹 Determina quale skeleton mostrare
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
      {/* 🔹 Mostra HeaderSkeleton solo quando necessario */}
      {showHeaderSkeleton && <HeaderSkeleton key={pathName} />}
      <main className="wrapper my-10 flex-1">
        <SkeletonComponent />
      </main>
    </div>
  );
};

export default Loading;
