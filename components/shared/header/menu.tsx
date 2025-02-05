import DynamicButton from "@/components/dynamic-button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import MobileNavigation from "./mobile-navigation";
import Theme from "./theme";
import UserButton from "./user-button";

const Menu = () => {
  return (
    <div className="flex justify-end gap-3">
      <nav className="hidden w-full max-w-xs gap-1 md:flex">
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
