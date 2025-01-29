import Menu from "@/components/shared/header/menu";
import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import MainNav from "./main-nav";
import LeftSidebar from "@/components/shared/sidebar/left-sidebar";
import { ADMIN_ROUTES } from "@/lib/constants/routes";
import { Input } from "@/components/ui/input";

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
              <span className="hidden lg:block font-bold text-2xl ml-3">
                {APP_NAME}
              </span>
            </Link>
          </div>
          <MainNav className="mx-6" />
          {/* MAIN NAV  */}
          <div className="mx-6 items-center flex space-x-4">
            <div>
              <Input
                type="search"
                placeholder="Search..."
                className="md:w-[100px] lg:w-[300px]"
              />
            </div>
          </div>

          <div className="mx-6 items-center flex space-x-4">
            <Menu />
          </div>
        </div>

        <div className="flex  w-full">
          <LeftSidebar sidebarLinks={links} />
          <div className="p-6 flex-1">{children}</div>
        </div>
      </div>
    </>
  );
}
