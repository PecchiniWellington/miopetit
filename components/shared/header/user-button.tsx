"use client";

import ROLES from "@/lib/constants/roles";
import { LayoutDashboard, Loader, LogOut, User, UserIcon } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import BrandButton from "../brand-components/brand-button";
import { CustomDropdown } from "../brand-components/brand-dropdown";

const UserButton = () => {
  const { data: session, status } = useSession({ required: false });
  const user = session?.user;
  const firstInitial = user?.name?.charAt(0).toUpperCase() ?? "";

  if (status === "loading") {
    return (
      <Loader className="size-6 animate-spin text-gray-500 dark:text-gray-400" />
    );
  }

  if (!session) {
    return (
      <BrandButton
        onClick={() => signIn()}
        className="flex items-center gap-2 rounded-full border border-gray-300 bg-gradient-to-r from-indigo-500 to-purple-600 p-1 text-white shadow-sm transition-all duration-300 hover:shadow-2xl dark:border-gray-600 dark:bg-gray-800"
        icon={<UserIcon className="size-6" />}
      >
        <span className="hidden font-medium md:flex">Sign In</span>
      </BrandButton>
    );
  }

  console.log("user", user);
  return (
    <CustomDropdown
      trigger={
        <button className="flex  items-center  rounded-full border-4 border-gray-300 bg-white bg-gradient-to-r from-indigo-500 to-purple-600  shadow-sm transition-all duration-300 hover:shadow-lg dark:border-gray-600 dark:bg-gray-800">
          {user?.image ? (
            <Image
              alt="User Avatar"
              src={user.image || "/images/placeholder.jpg"}
              height={40}
              width={40}
              objectFit="fill"
              className="rounded-full   object-contain  transition-all duration-300 hover:scale-105 hover:border-purple-400 dark:border-gray-500"
            />
          ) : (
            <div className="flex size-10 items-center justify-center overflow-hidden rounded-full border-2 border-gray-500 bg-gray-300 text-lg font-bold text-gray-700 shadow-md dark:border-gray-300 dark:bg-gray-700 dark:text-white">
              {firstInitial}
            </div>
          )}
        </button>
      }
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-col border-b border-gray-300 pb-3 text-sm font-semibold text-gray-700 dark:border-gray-600 dark:text-gray-300">
          <span className="text-lg font-bold">
            {(user?.name ?? "").length > 20
              ? `${(user?.name ?? "").substring(0, 20)}...`
              : user?.name}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {(user?.email ?? "").length > 30
              ? `${(user?.email ?? "").substring(0, 30)}...`
              : user?.email}
          </span>
        </div>
        <Link href="/user/profile">
          <div className="flex cursor-pointer items-center gap-3 rounded-md px-4 py-3 text-gray-700 transition-all duration-300 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
            <User size={18} className="text-indigo-500" /> Profile
          </div>
        </Link>
        {(user?.role === ROLES.ADMIN || user?.role === ROLES.CONTRIBUTOR) && (
          <Link href="/admin/overview">
            <div className="flex cursor-pointer items-center gap-3 rounded-md px-4 py-3 text-gray-700 transition-all duration-300 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
              <LayoutDashboard size={18} className="text-green-500" /> Admin
              Dashboard
            </div>
          </Link>
        )}
        <div
          onClick={async () => await signOut()}
          className="flex cursor-pointer items-center gap-3 rounded-md px-4 py-3 text-red-600 transition-all duration-300 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-800"
        >
          <LogOut size={18} /> Sign Out
        </div>
      </div>
    </CustomDropdown>
  );
};

export default UserButton;
