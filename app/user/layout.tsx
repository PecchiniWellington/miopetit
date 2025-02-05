import Menu from "@/components/shared/header/menu";
import LeftSidebar from "@/components/shared/sidebar/left-sidebar";
import { APP_NAME } from "@/lib/constants";
import { USER_ROUTES } from "@/lib/constants/routes";
import Image from "next/image";
import Link from "next/link";
import MainNav from "./main-nav";

const links = [
  {
    label: "Profile",
    route: USER_ROUTES.PROFILE,
    imgUrl: "/assets/icons/user.svg",
  },
  {
    label: "Orders",
    route: USER_ROUTES.ORDERS,
    imgUrl: "/assets/icons/clock.svg",
  },
];

export default function UserLayout({
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
