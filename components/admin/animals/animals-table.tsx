"use client";

import BrandBadge from "@/components/shared/brand-components/brand-badge";
import BrandButton from "@/components/shared/brand-components/brand-button";
import GenericModal from "@/components/shared/modals/delete-dialog";
import SortableTable from "@/components/shared/tables/sortable-table";
import { deleteAnimal } from "@/core/actions/admin/animals/delete-animals.action";
import { formatId } from "@/lib/utils";
import { motion } from "framer-motion";
import { AlertTriangle, Edit, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const GenderBadge = ({ gender }: { gender: string }) => {
  const genderMap = {
    MALE: "primary",
    FEMALE: "info",
  };

  return (
    <BrandBadge
      label={gender}
      variant={
        (genderMap[gender as keyof typeof genderMap] || "default") as
          | "primary"
          | "info"
          | "default"
      }
      className="font-bold"
    />
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const statusMap = {
    ADOPTABLE: "success",
    IN_CARE: "primary",
    ADOPTED: "info",
    DECEASED: "danger",
  };

  return (
    <BrandBadge
      label={status}
      variant={
        (statusMap[status as keyof typeof statusMap] || "default") as
          | "success"
          | "primary"
          | "info"
          | "danger"
          | "default"
      }
      className="font-bold"
    />
  );
};

const AnimalsTable = ({ animals }: { animals?: any[] }) => {
  const t = useTranslations("ModalDelete");

  return (
    <motion.div
      className="rounded-xl border border-gray-700 bg-gray-800/50 p-6 shadow-lg backdrop-blur-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="mb-6 text-xl font-semibold text-gray-100">Animals</h2>

      <div className="overflow-x-auto">
        {animals && animals.length > 0 ? (
          <SortableTable
            columns={[
              { key: "id", label: "ID" },
              { key: "name", label: "NAME" },
              { key: "breed", label: "BREED" },
              { key: "gender", label: "GENDER" },
              { key: "status", label: "STATUS" },
              { key: "age", label: "AGE" },
            ]}
            data={animals}
            renderRow={(animal: any) => (
              <motion.tr
                key={animal.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                  <span className="inline-flex rounded-full bg-blue-800 px-2 text-xs font-semibold leading-5 text-blue-100">
                    {formatId(animal.id)}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center">
                    <div className="size-10 shrink-0">
                      <div className="flex size-10 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-pink-400 to-yellow-500 font-semibold text-white">
                        {animal.photoUrl ? (
                          <Image
                            src={animal.photoUrl}
                            alt={animal.name || "Animal"}
                            width={50}
                            height={50}
                            className="size-full object-cover"
                          />
                        ) : (
                          <div>{animal?.name?.charAt(0)}</div>
                        )}
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-100">
                        {animal.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                  {animal.breed}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <GenderBadge gender={animal.gender} />
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <StatusBadge status={animal.status} />
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                  {animal.age}
                </td>
                <td className="flex items-center gap-2 whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                  <BrandButton>
                    <Link href={`/admin/animals/${animal.id}/edit`}>
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
                    onConfirm={() => deleteAnimal(animal.id)}
                  />
                </td>
              </motion.tr>
            )}
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-10">
            <p className="text-lg font-semibold text-gray-300">
              No Animals found
            </p>
            <p className="text-sm text-gray-500">
              Try adjusting your filters or add a new animal.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AnimalsTable;
