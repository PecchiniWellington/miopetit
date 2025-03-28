import { auth } from "@/auth";
import MegaMenu from "@/components/mega-menu/mega-menu";
import { getMyCart } from "@/core/actions/cart/cart.actions";
import { getAllCategoriesForMegaMenu } from "@/core/actions/products/mega-menu.action";
import { APP_NAME } from "@/lib/constants";
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
  const categories = ["dogs", "cats", "small-animals"];
  const [megaMenuDog, megaMenuCat, megaMenuSmallAnimal] = await Promise.all(
    categories.map((category) => getAllCategoriesForMegaMenu(category))
  );
  const session = await auth();
  let countLoggedUser = null;
  if (session?.user.id) {
    countLoggedUser = await getMyCart();
  }

  return (
    <header className=" w-full shadow-md">
      <SearchProvider>
        <TopBar />

        <div className="bg-p">
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
              <GlobalSearch />
            </div>

            <div className="flex items-center gap-4">
              <CartCounter
                countLoggedUser={
                  countLoggedUser && "items" in countLoggedUser
                    ? countLoggedUser.items.reduce(
                        (acc, item) => acc + item.qty,
                        0
                      )
                    : 0
                }
              />
              {session?.user && (
                <span className="hidden md:flex">
                  <FavoritesCounter />
                </span>
              )}
              <UserButton />
            </div>
          </div>
        </div>

        <div className="flex items-center px-4 py-3 md:hidden">
          <GlobalSearch />
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
            <div className="cursor-pointer p-4 text-lg font-semibold text-gray-700 transition-all duration-300 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400">
              <Link href={`/partners`}>Partners</Link>
            </div>
            <div className="cursor-pointer p-4 text-lg font-semibold text-gray-700 transition-all duration-300 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400">
              <Link href={`/shelter`}>Shelter</Link>
            </div>
          </nav>
        </div>
      </SearchProvider>
    </header>
  );
};

export default Header;
