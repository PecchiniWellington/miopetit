import { auth } from "@/auth";
import MegaMenu from "@/components/mega-menu/mega-menu";
import { getMyCart } from "@/core/actions/cart/cart.actions";
import { getAllCategoriesForMegaMenu } from "@/core/actions/products/mega-menu.action";
import { getUserById } from "@/core/actions/user";
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
  let userLogged = null;

  if (session && session.user && typeof session.user.id === "string") {
    const user = await getUserById(session.user.id);

    if (
      user &&
      user.defaultAddress &&
      !Array.isArray(user.defaultAddress) &&
      typeof user.defaultAddress === "object"
    ) {
      userLogged = {
        ...user,
        defaultAddress: {
          street:
            typeof user.defaultAddress.street === "string"
              ? user.defaultAddress.street
              : "",
          city:
            typeof user.defaultAddress.city === "string"
              ? user.defaultAddress.city
              : "",
          fullName:
            typeof user.defaultAddress.fullName === "string"
              ? user.defaultAddress.fullName
              : "",
          postalCode:
            typeof user.defaultAddress.postalCode === "string"
              ? user.defaultAddress.postalCode
              : "",
          country:
            typeof user.defaultAddress.country === "string"
              ? user.defaultAddress.country
              : "",
          id: user.defaultAddress.id as string,
          userId: user.defaultAddress.userId as string,
          isDefault: user.defaultAddress.isDefault as boolean,
        },
      };
    }
  }
  return (
    <header className=" w-full shadow-md">
      <SearchProvider>
        <TopBar />

        <div className=" bg-gradient-to-r from-indigo-500 to-purple-600 ">
          <div className="md:wrapper flex items-center justify-between   px-4 py-3 ">
            {/* 🍔 Menu Mobile */}
            <Menu
              user={userLogged}
              className="flex items-center px-4 py-3 md:hidden"
            />

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
              <UserButton userLogged={userLogged} />
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
          </nav>
        </div>
      </SearchProvider>
    </header>
  );
};

export default Header;
