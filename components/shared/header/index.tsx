import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

import CtBanner from "@/components/ct-banner";
import MegaMenu from "@/components/mega-menu/mega-menu";
import menuCat from "@/core/db-static/mega-menu/menu-cats.json";
import menuDog from "@/core/db-static/mega-menu/menu-dogs.json";
import menuSmallAnimals from "@/core/db-static/mega-menu/menu-small-animals.json";
import { Heart, ShoppingCart } from "lucide-react";
import Menu from "./menu";
import Search from "./search";
import UserButton from "./user-button";

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
          <div className="md:hidden">
            <Menu />
          </div>

          <nav className="hidden items-center gap-8 border-l border-red-800 md:flex">
            {/*  <Theme /> */}

            <Link href="/cart">
              <ShoppingCart
                height={30}
                width={30}
                className="ml-8 text-red-800"
              />
            </Link>
            <Link href="/favourites">
              <Heart height={30} width={30} className=" text-red-800" />
            </Link>

            <UserButton />
          </nav>
        </div>
      </div>

      <nav className="wrapper relative z-50  hidden gap-6 md:flex">
        <MegaMenu data={menuDog} brands={["Royal Canin", "Purina", "Hill’s"]} />
        <MegaMenu data={menuCat} brands={["Royal Canin", "Purina", "Hill’s"]} />
        <MegaMenu
          data={menuSmallAnimals}
          brands={["Royal Canin", "Purina", "Hill’s"]}
        />
      </nav>
      <div>
        <CtBanner />
      </div>
    </header>
  );
};

export default Header;
