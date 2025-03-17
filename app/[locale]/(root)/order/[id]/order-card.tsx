import BrandBadge from "@/components/shared/brand-components/brand-badge";
import GenericCard from "@/components/shared/brand-components/brand-card";
import { formatDateTime } from "@/lib/utils";
import { Calendar, CheckCircle, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

const OrderCard = ({
  children,
  isPaid,
  subtitle,
  paidAt,
  title,
  confirmedType,
  toConfirmType,
}: {
  children?: React.ReactNode;
  isPaid?: boolean;
  subtitle?: string;
  paidAt?: Date | null;
  title?: string;
  confirmedType?: string;
  toConfirmType?: string;
}) => {
  const [paidStatus, setPaidStatus] = useState(isPaid);

  useEffect(() => {
    setPaidStatus(isPaid);
  }, [isPaid]);

  return (
    <GenericCard className="rounded-2xl border-gray-300 shadow-lg dark:border-gray-700 dark:bg-gray-900">
      {/* Header con titolo e badge */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h2>
        {confirmedType || toConfirmType ? (
          <BrandBadge
            variant={isPaid ? "success" : "danger"}
            icon={
              isPaid ? (
                <CheckCircle className="size-4 text-green-500" />
              ) : (
                <XCircle className="size-4 text-red-500" />
              )
            }
            label={isPaid ? confirmedType : toConfirmType}
          />
        ) : null}
      </div>

      {/* Divider */}
      <div className="mb-4 border-t border-gray-200 dark:border-gray-700"></div>

      {/* Paid date info */}
      {paidStatus && paidAt && (
        <div className="mb-3 flex items-center gap-3 text-sm text-gray-700 dark:text-gray-400">
          <Calendar className="size-5 text-indigo-500" />
          <span>Pagato il {formatDateTime(paidAt.toString()).dateTime}</span>
        </div>
      )}

      {/* Subtitle */}
      {subtitle && (
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          {subtitle}
        </p>
      )}

      {/* Extra Content */}
      {children && <div className="mt-2">{children}</div>}
    </GenericCard>
  );
};

export default OrderCard;
