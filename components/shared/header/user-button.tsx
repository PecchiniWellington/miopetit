"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ROLES from "@/lib/constants/roles";
import { LayoutDashboard, Loader, LogOut, User, UserIcon } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const UserButton = ({ userLogged }: { userLogged: any }) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <Loader className="size-6 animate-spin text-gray-500 dark:text-gray-400" />
    );
  }

  if (!session) {
    return (
      <button
        onClick={() => signIn()}
        className="flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none"
      >
        <UserIcon className="size-6" />
        <span className="font-medium">Sign In</span>
      </button>
    );
  }

  const user = session.user;
  const firstInitial = user?.name?.charAt(0).toUpperCase() ?? "";

  console.log("userLogged", userLogged);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-full border border-gray-300 bg-white p-1 shadow-sm transition-all duration-300 hover:shadow-lg dark:border-gray-600 dark:bg-gray-800">
          {userLogged?.image ? (
            <Image
              alt="User Avatar"
              src={userLogged.image || "/images/placeholder.jpg"}
              height={42}
              width={42}
              className="rounded-full border-2 border-transparent bg-gradient-to-r from-indigo-500 to-purple-600 p-[2px] transition-all duration-300 hover:scale-105 hover:border-indigo-400 dark:border-gray-500"
            />
          ) : (
            <div className="flex size-10 items-center justify-center overflow-hidden rounded-full border-2 border-gray-500 bg-gray-300 text-lg font-bold text-gray-700 shadow-md dark:border-gray-300 dark:bg-gray-700 dark:text-white">
              {firstInitial}
            </div>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="min-w-64 rounded-xl border border-gray-200 bg-white p-3 shadow-xl transition-all duration-300 dark:border-gray-700 dark:bg-gray-900"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="flex items-center gap-3 border-b border-gray-300 pb-3 text-sm font-semibold text-gray-700 dark:border-gray-600 dark:text-gray-300">
          <div className="flex flex-col">
            <span className="text-lg font-bold">{user.name}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {user.email}
            </span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuItem className="flex items-center gap-3 rounded-md px-4 py-3 text-gray-700 transition-all duration-300 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
          <User size={18} className="text-indigo-500" />
          <Link href="/user/profile" className="block w-full">
            Profile
          </Link>
        </DropdownMenuItem>

        {user.role === ROLES.ADMIN && (
          <DropdownMenuItem className="flex items-center gap-3 rounded-md px-4 py-3 text-gray-700 transition-all duration-300 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
            <LayoutDashboard size={18} className="text-green-500" />
            <Link href="/admin/overview" className="block w-full">
              Admin Dashboard
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem
          onClick={() => signOut()}
          className="flex items-center gap-3 rounded-md px-4 py-3 text-red-600 transition-all duration-300 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-800"
        >
          <LogOut size={18} />
          <span className="block w-full">Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
