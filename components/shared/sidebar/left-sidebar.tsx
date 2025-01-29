import React from "react";

import { auth, signOut } from "@/auth";
import NavLinks from "../header/nav-links";

const LeftSidebar = async ({
  sidebarLinks,
}: {
  sidebarLinks: { imgUrl: string; route: string; label: string }[];
}) => {
  const session = await auth();
  const userId = session?.user?.id;

  return (
    <section className="custom-scrollbar  light-border sticky left-0 top-0 flex h-screen flex-col  overflow-y-auto border-r p-6  shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
      <div className="flex flex-1 flex-col gap-2 ">
        <NavLinks userId={userId} sidebarLinks={sidebarLinks} />
      </div>
    </section>
  );
};

export default LeftSidebar;
