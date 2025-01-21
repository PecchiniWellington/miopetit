import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { HeartIcon, ShoppingCart, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

import MobileNavigation from "./mobile-navigation";
import Theme from "./theme";

const Header = () => {
  return (
    <header className="w-full border-b ">
      <div className="wrapper flex-between">
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
        <div className="space-x-1">
          <Button asChild variant="ghost">
            <Link href="/cart">
              <ShoppingCart />
            </Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/cart">
              <HeartIcon />
            </Link>
          </Button>
          <Button
            asChild
            className="primary-gradient min-h-[24px] !text-light-900 border-0.2 border-slate-300"
          >
            <Link href="/sign-in">
              <UserIcon />
            </Link>
          </Button>
          <Theme />
        </div>
        <MobileNavigation />
      </div>
    </header>
  );
};

export default Header;
