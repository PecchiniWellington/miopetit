import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="flex-start">
        <Link href="/" className="flex-start">
          <Image
            src="/images/petitLogo.png"
            alt={`${APP_NAME}`}
            height={48}
            width={48}
            /*  priority={true} */
          />
          <span className="hidden lg:blog font-bold text-2xl ml-3">
            {APP_NAME}
          </span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
