import React from "react";
import Theme from "./theme";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import MobileNavigation from "./mobile-navigation";
import Link from "next/link";
import UserButton from "./user-button";

const Menu = () => {
  return (
    <div className="flex justify-edn gap-3">
      <nav className="hidden md:flex w-full max-w-xs gap1">
        <Theme />
        <Button asChild variant="ghost">
          <Link href="/cart">
            <ShoppingCart />
          </Link>
        </Button>
        <UserButton />
      </nav>
      <nav className="md:hidden">
        <MobileNavigation />
      </nav>
    </div>
  );
};

export default Menu;
