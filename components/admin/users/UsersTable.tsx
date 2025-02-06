"use client";
import DeleteDialog from "@/components/shared/delete-dialog";
import { Badge } from "@/components/ui/badge";
import { deleteUser } from "@/lib/actions/admin/admin.actions";
import ROLES from "@/lib/constants/roles";
import { USER_STATUS_ACTIVATION } from "@/lib/constants/user-status";
import { formatId } from "@/lib/utils";
import { IUser } from "@/types";
import { motion } from "framer-motion";
import { Edit, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Roles = ({ userRole }: { userRole: string }) => {
  switch (userRole) {
    case ROLES.ADMIN:
      return (
        <Badge className="bg-blue-100 text-blue-700"> {ROLES.ADMIN}</Badge>
      );

    case ROLES.USER:
      return (
        <Badge className="bg-purple-100 text-purple-700"> {ROLES.USER}</Badge>
      );

    case ROLES.EDITOR:
      return (
        <Badge className="bg-orange-100 text-orange-700">{ROLES.EDITOR}</Badge>
      );

    case ROLES.CONTRIBUTOR:
      return (
        <Badge className="bg-teal-100 text-teal-700">{ROLES.CONTRIBUTOR}</Badge>
      );

    default:
      return <Badge className="bg-gray-400 text-gray-700">NO ROLE</Badge>;
  }
};
const Status = ({ userStatus }: { userStatus: USER_STATUS_ACTIVATION }) => {
  switch (userStatus) {
    case USER_STATUS_ACTIVATION.ACTIVE:
      return (
        <Badge className="bg-teal-100 text-teal-700">
          {USER_STATUS_ACTIVATION.ACTIVE}
        </Badge>
      );

    case USER_STATUS_ACTIVATION.INACTIVE:
      return (
        <Badge className="bg-orange-100 text-orange-700">
          {" "}
          {USER_STATUS_ACTIVATION.INACTIVE}
        </Badge>
      );

    case USER_STATUS_ACTIVATION.PENDING:
      return (
        <Badge className="bg-orange-100 text-orange-700">
          {USER_STATUS_ACTIVATION.PENDING}
        </Badge>
      );

    case USER_STATUS_ACTIVATION.BANNED:
      return (
        <Badge className="bg-red-100 text-red-700">
          {USER_STATUS_ACTIVATION.BANNED}
        </Badge>
      );

    default:
      return <Badge className="bg-gray-400 text-gray-700">NO ROLE</Badge>;
  }
};

import { ChangeEvent } from "react";
const UsersTable = ({ users }: { users?: { data: IUser[] } }) => {
  const [searchTerm] = useState("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    return;
  };

  return (
    <motion.div
      className="rounded-xl border border-gray-700 bg-gray-800/50 p-6 shadow-lg backdrop-blur-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-100">Users</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            className="rounded-lg bg-gray-700 py-2 pl-10 pr-4 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                Id
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {users?.data?.map((user: IUser) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="whitespace-nowrap px-6 py-4">
                  <span className="inline-flex rounded-full bg-blue-800 px-2 text-xs font-semibold leading-5 text-blue-100">
                    {formatId(user.id)}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center">
                    <div className="size-10 shrink-0">
                      <div className="flex size-10 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-purple-400 to-blue-500 font-semibold text-white">
                        {user.image ? (
                          <Image
                            src={user.image}
                            alt={user.name}
                            width={50}
                            height={50}
                            className="size-full object-cover"
                          />
                        ) : (
                          <div>{user.name.charAt(0)}</div>
                        )}
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-100">
                        {user.name}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm text-gray-300">{user.email}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <Roles userRole={user.role} />
                </td>

                <td className="whitespace-nowrap px-6 py-4">
                  <Status userStatus={user.status} />
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                  <button className="mr-2 text-indigo-400 hover:text-indigo-300">
                    <Link href={`/admin/users/${user.id}`}>
                      {" "}
                      <Edit size={18} />
                    </Link>
                  </button>
                  <DeleteDialog id={user.id} action={deleteUser} />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
export default UsersTable;
