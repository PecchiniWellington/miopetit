"use client";
import BrandBadge from "@/components/shared/brand-components/brand-badge";
import BrandButton from "@/components/shared/brand-components/brand-button";
import GenericModal from "@/components/shared/modals/delete-dialog";
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
  switch (userRole) {
    case ROLES.ADMIN:
      return (
        <BrandBadge
          className="flex items-center justify-center text-center font-bold"
          label={ROLES.ADMIN}
          variant="primary"
        />
      );

    case ROLES.USER:
      return (
        <BrandBadge
          className="flex items-center justify-center text-center font-bold"
          label={ROLES.USER}
          variant="success"
        />
      );

    case ROLES.VETERINARIAN:
      return (
        <BrandBadge
          className="flex items-center justify-center text-center font-bold"
          label={ROLES.VETERINARIAN}
          variant="warning"
        />
      );

    case ROLES.RETAILER:
      return (
        <BrandBadge
          className="flex items-center justify-center text-center font-bold"
          label={ROLES.RETAILER}
          variant="danger"
        />
      );

    default:
      return (
        <BrandBadge
          className="flex items-center justify-center text-center font-bold"
          label="NO ROLE"
          variant="default"
        />
      );
  }
};
const Status = ({ userStatus }: { userStatus: string }) => {
  switch (userStatus) {
    case USER_STATUS_ACTIVATION.ACTIVE:
      return (
        <BrandBadge
          label={USER_STATUS_ACTIVATION.ACTIVE}
          variant="success"
          className="font-bold"
        />
      );

    case USER_STATUS_ACTIVATION.INACTIVE:
      return (
        <BrandBadge
          label={USER_STATUS_ACTIVATION.INACTIVE}
          variant="primary"
          className="font-bold"
        />
      );

    case USER_STATUS_ACTIVATION.PENDING:
      return (
        <BrandBadge
          label={USER_STATUS_ACTIVATION.PENDING}
          variant="warning"
          className="font-bold"
        />
      );

    case USER_STATUS_ACTIVATION.BANNED:
      return (
        <BrandBadge
          label={USER_STATUS_ACTIVATION.BANNED}
          variant="danger"
          className="font-bold"
        />
      );

    default:
      return <BrandBadge label="" className="font-bold" />;
  }
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
            {users?.map((user: IUser) => (
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

                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm text-gray-300">{user.email}</div>
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
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
export default UsersTable;
