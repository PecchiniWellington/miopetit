"use client";

import DynamicButton from "@/components/dynamic-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ROLES from "@/lib/constants/roles";
import { Loader, UserIcon } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const UserButton = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loader className="size-4 animate-spin" />;
  }

  if (!session) {
    return (
      <DynamicButton className="btn-ghost" handleAction={() => signIn()}>
        <UserIcon />
      </DynamicButton>
    );
  }

  const user = session.user;
  const firstInitial = user?.name?.charAt(0).toUpperCase() ?? "";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center">
          {user?.image ? (
            <Image
              alt="user avatar"
              src={user.image}
              height={40}
              width={40}
              className="rounded-full"
            />
          ) : (
            <div className=" flex size-10 items-center justify-center overflow-hidden rounded-full border-2 border-secondary-800 bg-slate-300">
              {firstInitial}
            </div>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="min-w-56 bg-slate-50 dark:bg-black"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <div className="text-sm font-bold leading-none">{user.name}</div>
            <div className="text-sm leading-none text-slate-400">
              {user.email}
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuItem>
          <Link href="/user/profile" className="w-full">
            <span className="block px-4 py-2">Profile</span>
          </Link>
        </DropdownMenuItem>

        {user.role === ROLES.ADMIN && (
          <DropdownMenuItem>
            <Link href="/admin/overview" className="w-full">
              <span className="block px-4 py-2">Admin Dashboard</span>
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem onClick={() => signOut()}>
          <span className="block px-4 py-2 text-red-500">Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
