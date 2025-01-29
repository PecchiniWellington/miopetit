import Footer from "@/components/footer";
import Header from "@/components/shared/header";
import Menu from "@/components/shared/header/menu";
import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import MainNav from "./main-nav";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="w-full">
        <div className="wrapper flex-between border-b">
          <div className="flex-start">
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
          <div className="ml-auto items-center flex space-x-4">
            <Menu />
          </div>
        </div>
        <div className=" p-8 pt-6 container mx-auto w-full">{children}</div>
      </div>
    </>
  );
}
