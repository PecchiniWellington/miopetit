import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

import CtBanner from "@/components/ct-banner";
import { NavigationMenuDemo } from "@/components/mega-menu";
import Menu from "./menu";
import Search from "./search";

const Header = () => {
  return (
    <header className="w-full border-b ">
      <div className="bg-primary-400">
        <div className="wrapper flex-between py-5">
          <div className="flex-start ">
            <Link href="/" className="flex-start">
              <Image
                src="/images/petitLogo.png"
                alt={`${APP_NAME}`}
                height={48}
                width={48}
                priority={true}
              />
              <span className="hidden text-2xl font-bold lg:block">
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
