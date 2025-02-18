import MegaMenu from "@/components/mega-menu/mega-menu";
import { getAllCategoriesForMegaMenu } from "@/core/actions/products/mega-menu.action";
import { getAllCategories } from "@/core/actions/products/product-infos.ts/get-product-category.action";
import { APP_NAME } from "@/lib/constants";
import { SessionProvider } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import CartCounter from "./cart-counter";
import FavoritesCounter from "./favourites-counter";
import Menu from "./menu";
import Search from "./search/search";
import UserButton from "./user-button";

const Header = async () => {
  const megaMenuCat = await getAllCategoriesForMegaMenu("gatti");
  const megaMenuDog = await getAllCategoriesForMegaMenu("cani");
  const megaMenuSmallAnimal =
    await getAllCategoriesForMegaMenu("piccoli-animali");
  const categories = await getAllCategories();

  return (
    <header className=" w-full  border-b shadow-md">
      {/* Top Navbar */}
      <div className=" bg-gradient-to-r from-indigo-500 to-purple-600">
        <div className="wrapper flex  items-center justify-between px-6 py-4 md:px-12">
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
          <div className=" flex w-full max-w-lg justify-center">
            <Search categories={categories} />
          </div>

          {/* Menu Mobile */}
          <div className="md:hidden">
            <Menu />
          </div>

          {/* User Actions */}
          <nav className="hidden items-center gap-6 md:flex">
            <CartCounter />
            <FavoritesCounter />
            <SessionProvider>
              <UserButton />
            </SessionProvider>
          </nav>
        </div>
      </div>

      {/* Mega Menu */}
      <div className=" relative z-20  gap-6 bg-white  shadow-md">
        <nav className="wrapper relative z-20 hidden gap-6 bg-white   md:flex">
          <MegaMenu
            data={megaMenuDog}
            imgSrc="/images/dog.png"
            brands={["Royal Canin", "Purina", "Hill’s"]}
          />
          <MegaMenu
            data={megaMenuCat}
            imgSrc="/images/cat.png"
            brands={["Royal Canin", "Purina", "Hill’s"]}
          />
          <MegaMenu
            data={megaMenuSmallAnimal}
            imgSrc="/images/bird.png"
            brands={["Royal Canin", "Purina", "Hill’s"]}
          />
        </nav>
      </div>

      {/* Call to Action Banner */}
      {/* <div>
        <CtBanner />
      </div> */}
    </header>
  );
};

export default Header;
