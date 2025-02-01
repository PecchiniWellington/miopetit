import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import Menu from "./menu";
import CategoryDrawer from "./category-drawer";
import Search from "./search";
import { NavigationMenuDemo } from "@/components/mega-menu";
import CtBanner from "@/components/ct-banner";

const Header = () => {
  return (
    <header className="w-full border-b ">
      <div className="bg-primary-400">
        <div className="wrapper py-5 flex-between">
          <div className="flex-start ">
            {/* <CategoryDrawer /> */}
            <Link href="/" className="flex-start">
              <Image
                src="/images/petitLogo.png"
                alt={`${APP_NAME}`}
                height={48}
                width={48}
                priority={true}
              />
              <span className="hidden lg:block font-bold text-2xl">
                {APP_NAME}
              </span>
            </Link>
          </div>
          <div className="hidden md:block">
            <Search />
          </div>
          <Menu />
        </div>
      </div>
      <div className="bg-primary-300">
        <NavigationMenuDemo />
      </div>
      <div>
        <CtBanner />
      </div>
    </header>
  );
};

export default Header;
