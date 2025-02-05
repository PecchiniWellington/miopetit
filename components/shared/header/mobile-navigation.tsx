import { UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import DynamicButton from "@/components/dynamic-button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ROUTES } from "@/lib/constants/routes";
import { sidebarLinks } from "@/lib/constants/sidebarLinks";
import NavLinks from "./nav-links";

const MobileNavigation = async () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="assets/icons/hamburger.svg"
          width={36}
          height={36}
          alt="Menu"
          className="invert-colors sm:hidden"
        />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="background-light900_dark200 border-none"
      >
        <SheetTitle className="hidden">Navigation</SheetTitle>
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/images/petitLogo.png"
            width={23}
            height={23}
            alt="Logo"
          />

          <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900">
            MioPetit<span className="text-primary-500">Social</span>
          </p>
        </Link>

        <div className="no-scrollbar flex h-[calc(100vh-80px)] flex-col justify-between overflow-y-auto">
          <SheetClose asChild>
            <section className="flex h-full flex-col gap-6 pt-16">
              <NavLinks isMobileNav sidebarLinks={sidebarLinks} />
            </section>
          </SheetClose>

          <div className="flex flex-col gap-3">
            <>
              <SheetClose asChild>
                <Link href={ROUTES.SIGN_IN}>
                  <DynamicButton>
                    <Link href={ROUTES.SIGN_IN}>
                      <UserIcon />
                    </Link>
                  </DynamicButton>
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link href={ROUTES.SIGN_UP}>
                  <DynamicButton>Sign Up</DynamicButton>
                </Link>
              </SheetClose>
            </>
            {/*   )} */}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
