"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Edit, Search } from "lucide-react";
import { formatId } from "@/lib/utils";
import ROLES from "@/lib/constants/roles";
import { Badge } from "@/components/ui/badge";
import DeleteDialog from "@/components/shared/delete-dialog";
import { deleteUser } from "@/lib/actions/admin/admin.actions";
import Link from "next/link";
import Image from "next/image";
import { USER_STATUS_ACTIVATION } from "@/lib/constants/user-status";

const Roles = ({ userRole }: any) => {
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
const Status = ({ userRole }: any) => {
  switch (userRole) {
    case USER_STATUS_ACTIVATION.ACTIVE:
      return (
        <Badge className="bg-teal-100 text-teal-700">
          {" "}
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

const UsersTable = ({ users }: any) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: any) => {
    return;
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Users</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Id
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {users.data.map((user: any) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-800 text-blue-100">
                    {formatId(user.id)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 overflow-hidden rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold">
                        {user.image ? (
                          <Image
                            src={user.image}
                            alt={user.name}
                            width={50}
                            height={50}
                            className="object-cover h-full w-full"
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

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Roles userRole={user.role} />
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === "ACTIVE"
                        ? "bg-green-800 text-green-100"
                        : user.status === "PENDING"
                          ? "bg-yellow-800 text-yellow-100"
                          : "bg-red-800 text-red-100"
                    }`}
                  >
                    {user.status || "N/D"}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <button className="text-indigo-400 hover:text-indigo-300 mr-2">
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
