import Menu from "@/components/shared/header/menu";
import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import MainNav from "./main-nav";
import LeftSidebar from "@/components/shared/sidebar/left-sidebar";
import { USER_ROUTES } from "@/lib/constants/routes";

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
              <span className="hidden lg:block font-bold text-2xl ml-3">
                {APP_NAME}
              </span>
            </Link>
          </div>
          <MainNav className="mx-6" />
          {/* MAIN NAV  */}
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
