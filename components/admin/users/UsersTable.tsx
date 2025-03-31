"use client";

import BrandBadge from "@/components/shared/brand-components/brand-badge";
import BrandButton from "@/components/shared/brand-components/brand-button";
import GenericModal from "@/components/shared/modals/delete-dialog";
import SortableTable from "@/components/shared/tables/sortable-table";
import { deleteUser } from "@/core/actions/admin/admin.actions";
import { IUser } from "@/core/validators";
import ROLES from "@/lib/constants/roles";
import { USER_STATUS_ACTIVATION } from "@/lib/constants/user-status";
import { formatId } from "@/lib/utils";
import { motion } from "framer-motion";
import { AlertTriangle, Edit, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import AdminSearch, { SearchProvider } from "../admin-search";

const Roles = ({ userRole }: { userRole: string }) => {
  const roleMap = {
    [ROLES.ADMIN]: "primary",
    [ROLES.USER]: "success",
    [ROLES.VETERINARIAN]: "warning",
    [ROLES.RETAILER]: "danger",
    [ROLES.VOLUNTEER]: "info",
  };

  return (
    <BrandBadge
      className="flex items-center justify-center text-center font-bold"
      label={userRole || "NO ROLE"}
      variant={
        (roleMap[userRole as keyof typeof roleMap] || "default") as
          | "primary"
          | "success"
          | "warning"
          | "danger"
          | "info"
          | "default"
      }
    />
  );
};

const Status = ({ userStatus }: { userStatus: string }) => {
  const statusMap = {
    [USER_STATUS_ACTIVATION.ACTIVE]: "success",
    [USER_STATUS_ACTIVATION.INACTIVE]: "primary",
    [USER_STATUS_ACTIVATION.PENDING]: "warning",
    [USER_STATUS_ACTIVATION.BANNED]: "danger",
  };

  return (
    <BrandBadge
      label={userStatus}
      variant={
        (statusMap[userStatus as keyof typeof statusMap] || "default") as
          | "primary"
          | "success"
          | "warning"
          | "danger"
          | "info"
          | "default"
      }
      className="font-bold"
    />
  );
};

const UsersTable = ({ users }: { users?: IUser[] }) => {
  const t = useTranslations("ModalDelete");

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
          <SearchProvider>
            <AdminSearch />
          </SearchProvider>
        </div>
      </div>

      <div className="overflow-x-auto">
        {users ? (
          <SortableTable
            columns={[
              { key: "id", label: "ID" },
              { key: "name", label: "NAME" },
              { key: "email", label: "EMAIL" },
              { key: "role", label: "ROLE" },
              { key: "status", label: "STATUS" },
            ]}
            data={users}
            renderRow={(user: IUser) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
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
                            alt={user.name || "User"}
                            width={50}
                            height={50}
                            className="size-full object-cover"
                          />
                        ) : (
                          <div>{user?.name?.charAt(0)}</div>
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
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                  {user.email}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <Roles userRole={user.role} />
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <Status userStatus={user.status} />
                </td>
                <td className="flex items-center gap-2 whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                  <BrandButton>
                    <Link href={`/admin/users/${user.id}`}>
                      <Edit size={18} />
                    </Link>
                  </BrandButton>
                  <GenericModal
                    triggerButton={
                      <BrandButton
                        variant="danger"
                        icon={<Trash2 className="size-5" />}
                      />
                    }
                    title={t("AccountDelete.delete_account_modal.title")}
                    description={t(
                      "AccountDelete.delete_account_modal.description"
                    )}
                    confirmText={t(
                      "AccountDelete.delete_account_modal.delete_button"
                    )}
                    cancelText={t(
                      "AccountDelete.delete_account_modal.cancel_button"
                    )}
                    icon={<AlertTriangle className="size-5 text-red-500" />}
                    variant="danger"
                    onConfirm={() => deleteUser(user.id)}
                  />
                </td>
              </motion.tr>
            )}
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-10">
            <p className="text-lg font-semibold text-gray-300">
              No Users found
            </p>
            <p className="text-sm text-gray-500">
              Try adjusting your search or adding new Users.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default UsersTable;
