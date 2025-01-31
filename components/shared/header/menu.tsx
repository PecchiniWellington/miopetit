import React from "react";
import Theme from "./theme";
import { ShoppingCart } from "lucide-react";
import MobileNavigation from "./mobile-navigation";
import Link from "next/link";
import UserButton from "./user-button";
import DynamicButton from "@/components/dynamic-button";

const Menu = () => {
  return (
    <div className="flex justify-end gap-3">
      <nav className="hidden md:flex w-full max-w-xs gap-1">
        <Theme />
        <DynamicButton className="btn-ghost">
          <Link href="/cart">
            <ShoppingCart />
          </Link>
        </DynamicButton>
        <UserButton />
      </nav>
      <nav className="md:hidden">
        <MobileNavigation />
      </nav>
    </div>
  );
};

export default Menu;
