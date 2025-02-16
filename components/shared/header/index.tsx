import CtBanner from "@/components/ct-banner";
import MegaMenu from "@/components/mega-menu/mega-menu";
import { getAllCategoriesForMegaMenu } from "@/core/actions/products/mega-menu.action";
import { APP_NAME } from "@/lib/constants";
import { Heart, ShoppingCart } from "lucide-react";
import { SessionProvider } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Menu from "./menu";
import Search from "./search";
import UserButton from "./user-button";

const Header = async () => {
  const megaMenuCat = await getAllCategoriesForMegaMenu("gatti");
  const megaMenuDog = await getAllCategoriesForMegaMenu("cani");
  const megaMenuSmallAnimal =
    await getAllCategoriesForMegaMenu("piccoli-animali");

  return (
    <header className="w-full border-b shadow-md">
      {/* Top Navbar */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600">
        <div className="wrapper flex items-center justify-between px-6 py-4 md:px-12">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/petitLogo.png"
              alt={APP_NAME}
              height={48}
              width={48}
              priority
              className="transition-transform duration-300 hover:scale-105"
            />
            <span className="hidden text-2xl font-bold text-white lg:block">
              {APP_NAME}
            </span>
          </Link>

          {/* Search Bar */}
          <div className="hidden w-full max-w-lg md:block">
            <Search />
          </div>

          {/* Menu Mobile */}
          <div className="md:hidden">
            <Menu />
          </div>

          {/* User Actions */}
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/cart" className="relative">
              <ShoppingCart
                height={28}
                width={28}
                className="text-white transition-all duration-300 hover:scale-110"
              />
              <span className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                3
              </span>
            </Link>
            <Link href="/favourites" className="relative">
              <Heart
                height={28}
                width={28}
                className="text-white transition-all duration-300 hover:scale-110"
              />
              <span className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                5
              </span>
            </Link>
            <SessionProvider>
              <UserButton />
            </SessionProvider>
          </nav>
        </div>
      </div>

      {/* Mega Menu */}
      <div className=" relative z-50  gap-6 bg-white  shadow-md">
        <nav className="wrapper relative z-50 hidden gap-6 bg-white   md:flex">
          <MegaMenu
            data={megaMenuDog}
            imgSrc="/images/dog.png"
            mainCategory="cane"
            brands={["Royal Canin", "Purina", "Hill’s"]}
          />
          <MegaMenu
            data={megaMenuCat}
            imgSrc="/images/cat.png"
            mainCategory="gatto"
            brands={["Royal Canin", "Purina", "Hill’s"]}
          />
          <MegaMenu
            data={megaMenuSmallAnimal}
            imgSrc="/images/bird.png"
            brands={["Royal Canin", "Purina", "Hill’s"]}
            mainCategory="piccoli animali"
          />
        </nav>
      </div>

      {/* Call to Action Banner */}
      <div>
        <CtBanner />
      </div>
    </header>
  );
};

export default Header;
