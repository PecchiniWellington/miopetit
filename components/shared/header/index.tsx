import { auth } from "@/auth";
import MegaMenu from "@/components/mega-menu/mega-menu";
import { getAllCategoriesForMegaMenu } from "@/core/actions/products/mega-menu.action";
import { getAllBrands } from "@/core/actions/products/product-infos.ts";
import { getUserById } from "@/core/actions/user";
import { APP_NAME } from "@/lib/constants";
import { SessionProvider } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import CartCounter from "./cart-counter";
import FavoritesCounter from "./favourites-counter";
import GlobalSearch from "./global-search";
import { SearchProvider } from "./global-search/global-search-context";
import Menu from "./menu";
import TopBar from "./top-bar";
import UserButton from "./user-button";

const Header = async () => {
  const megaMenuCat = await getAllCategoriesForMegaMenu("gatti");
  const megaMenuDog = await getAllCategoriesForMegaMenu("cani");
  const megaMenuSmallAnimal =
    await getAllCategoriesForMegaMenu("piccoli-animali");
  const brands = await getAllBrands();

  const session = await auth();
  let userLogged = null;
  if (session && session.user && typeof session.user.id === "string") {
    userLogged = await getUserById(session.user.id);
  }
  return (
    <header className=" w-full shadow-md">
      {/* 🔔 Banner Promozionale */}
      <TopBar />

      {/* 📌 Header Principale */}
      {/* Top Navbar */}
      <div className=" bg-gradient-to-r from-indigo-500 to-purple-600 ">
        <div className="md:wrapper flex items-center justify-between   px-4 py-3 ">
          {/* 🍔 Menu Mobile */}
          <Menu className="flex items-center px-4 py-3 md:hidden" />

          {/* 🏠 Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/petitLogo.png"
              alt={APP_NAME}
              height={40}
              width={40}
              priority
              className="transition-transform duration-300 hover:scale-105"
            />
          </Link>
          <div className="hidden items-center px-4 py-3 md:flex">
            <SearchProvider>
              <GlobalSearch />
            </SearchProvider>
          </div>

          {/* 🛒 Carrello + Utente */}
          <div className="flex items-center gap-4">
            <CartCounter />
            {userLogged && (
              <span className="hidden md:flex">
                <FavoritesCounter />
              </span>
            )}
            <SessionProvider>
              <UserButton userLogged={userLogged} />
            </SessionProvider>
          </div>
        </div>
      </div>

      {/* 🔍 Barra di Ricerca */}
      <div className="flex items-center px-4 py-3 md:hidden">
        <SearchProvider>
          <GlobalSearch />
        </SearchProvider>
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
    </header>
  );
};

export default Header;
