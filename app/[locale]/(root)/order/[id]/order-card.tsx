import { BadgeStatus } from "@/components/shared/badge-status";
import { Card, CardContent } from "@/components/ui/card";
import { STATUS } from "@/lib/constants";
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
    <Card className="relative overflow-hidden rounded-2xl border border-gray-300 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-900">
      <CardContent className="space-y-5">
        {/* Intestazione con titolo e badge */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h2>

          {confirmedType || toConfirmType ? (
            <BadgeStatus
              status={isPaid ? "success" : STATUS.DANGER}
              className="flex items-center gap-1 px-3 py-1 text-sm font-medium"
            >
              {isPaid ? (
                <>
                  <CheckCircle className="size-4 text-green-500" />
                  {confirmedType}
                </>
              ) : (
                <>
                  <XCircle className="size-4 text-red-500" />
                  {toConfirmType}
                </>
              )}
            </BadgeStatus>
          ) : null}
        </div>

        {/* Divider elegante */}
        <div className="border-t border-gray-200 dark:border-gray-700"></div>

        {/* Dettagli pagamento */}
        {paidStatus && paidAt && (
          <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-400">
            <Calendar className="size-5 text-indigo-500" />
            <span>Pagato il {formatDateTime(paidAt.toString()).dateTime}</span>
          </div>
        )}

        {/* Sottotitolo */}
        {subtitle && (
          <p className="text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>
        )}

        {/* Contenuto Extra (Children) */}
        {children && <div className="mt-2">{children}</div>}
      </CardContent>
    </Card>
  );
};

export default OrderCard;
