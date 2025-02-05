import AdminSearch from "@/components/admin-1/admin-search";
import Menu from "@/components/shared/header/menu";
import LeftSidebar from "@/components/shared/sidebar/left-sidebar";
import { APP_NAME } from "@/lib/constants";
import { ADMIN_ROUTES } from "@/lib/constants/routes";
import Image from "next/image";
import Link from "next/link";
import MainNav from "./main-nav";

const links = [
  {
    label: "Overview",
    route: ADMIN_ROUTES.OVERVIEW,
    imgUrl: "/assets/icons/eye.svg",
  },
  {
    label: "Orders",
    route: ADMIN_ROUTES.ORDERS,
    imgUrl: "/assets/icons/clock.svg",
  },
  {
    label: "Products",
    route: ADMIN_ROUTES.PRODUCTS,
    imgUrl: "/assets/icons/suitcase.svg",
  },
  {
    label: "Users",
    route: ADMIN_ROUTES.USERS,
    imgUrl: "/assets/icons/user.svg",
  },
  {
    label: "Categories",
    route: ADMIN_ROUTES.CATEGORIES,
    imgUrl: "/assets/icons/bronze-medal.svg",
  },
  {
    label: "Upload",
    route: ADMIN_ROUTES.UPLOAD,
    imgUrl: "/assets/icons/upload-file-svgrepo-com.svg",
  },
];

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="w-full">
        <div className="flex-between border-b">
          <div className="flex-start wrapper">
            <Link href="/" className="flex-start">
              <Image
                src="/images/petitLogo.png"
                alt={`${APP_NAME}`}
                height={48}
                width={48}
                priority={true}
              />
              <span className="ml-3 hidden text-2xl font-bold lg:block">
                {APP_NAME}
              </span>
            </Link>
          </div>
          <MainNav className="mx-6" />
          {/* MAIN NAV  */}
          <div className="mx-6 flex items-center space-x-4">
            <AdminSearch />
            <Menu />
          </div>
        </div>

        <div className="flex  w-full">
          <LeftSidebar sidebarLinks={links} />
          <div className="flex-1 p-6">{children}</div>
        </div>
      </div>
    </>
  );
}
