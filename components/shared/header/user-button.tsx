import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOutUser } from "@/lib/actions/auth/auth.actions";
import ROLES from "@/lib/constants/roles";

import { UserIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const UserButton = async () => {
  const session = await auth();

  if (!session) {
    return (
      <Button
        asChild
        className="primary-gradient min-h-[24px] !text-light-900 border-0.2 border-slate-300"
      >
        <Link href="/sign-in">
          <UserIcon />
        </Link>
      </Button>
    );
  }

  const firstInitial = session.user?.name?.charAt(0).toUpperCase() ?? "";

  return (
    <div className="flex gap-2 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center">
            <Button
              variant="ghost"
              className="relative w-8 h-8 rounded-full flex items-center justify-center ml-2 bg-gray-200"
            >
              {firstInitial}
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="min-w-56 bg-slate-50 dark:bg-black"
          align="end"
          forceMount
        >
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <div className="text-sm font-bold  leading-none ">
                {session.user?.name}
              </div>
              <div className="text-sm text-muted-foreground leading-none text-slate-400">
                {session.user?.email}
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuItem>
            <Link href="/user/profile" className="w-full">
              <span className="block py-2 px-4">Profile</span>
            </Link>
          </DropdownMenuItem>

          {session.user?.role === ROLES.ADMIN && (
            <DropdownMenuItem>
              <Link href="/admin/overview" className="w-full">
                <span className="block py-2 px-4">Admin Dashboard</span>
              </Link>
            </DropdownMenuItem>
          )}

          <form action={signOutUser as any}>
            <Button
              type="submit"
              variant="ghost"
              className="w-full mt-2 py-4 px-2 h-4 justify-start primary-gradient min-h-[24px] !text-light-900 border-0.2 border-slate-300"
            >
              Sign Out
            </Button>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserButton;
