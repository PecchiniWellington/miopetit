import { auth } from "@/auth";
import DynamicButton from "@/components/dynamic-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getUserById } from "@/core/actions/user/user.action";
import ROLES from "@/lib/constants/roles";

import { UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SignOutBtn from "./sign-out-btn";

const UserButton = async () => {
  const session = await auth();

  if (!session) {
    return (
      <DynamicButton className="btn-ghost">
        <Link href="/sign-in">
          <UserIcon />
        </Link>
      </DynamicButton>
    );
  }

  const firstInitial = session.user?.name?.charAt(0).toUpperCase() ?? "";
  const userId = session.user?.id;
  const user = userId ? await getUserById(userId) : undefined;

  return (
    <div className="flex items-center gap-2">
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
              <DynamicButton className="btn-outline overflow-hidden rounded-full">
                <div>{firstInitial}</div>
              </DynamicButton>
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
              <div className="text-sm font-bold  leading-none ">
                {session.user?.name}
              </div>
              <div className="text-sm leading-none text-slate-400">
                {session.user?.email}
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuItem>
            <Link href="/user/profile" className="w-full">
              <span className="block px-4 py-2">Profile</span>
            </Link>
          </DropdownMenuItem>

          {session.user?.role === ROLES.ADMIN && (
            <DropdownMenuItem>
              <Link href="/admin/overview" className="w-full">
                <span className="block px-4 py-2">Admin Dashboard</span>
              </Link>
            </DropdownMenuItem>
          )}

          <SignOutBtn />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserButton;
