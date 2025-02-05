import { BadgeStatus } from "@/components/shared/badge-status";
import { Card, CardContent } from "@/components/ui/card";
import { STATUS } from "@/lib/constants";
import { formatDateTime } from "@/lib/utils";

const OrderCard = ({
  children,
  isPaid,
  subtitle,
  paidAt,
  title,
  type,
}: {
  children?: React.ReactNode;
  isPaid?: boolean;
  subtitle?: string;
  paidAt?: Date | null;
  title?: string;
  type?: string;
}) => {
  return (
    <Card>
      <CardContent className="gap-4 p-4">
        <h2 className="pb-4 text-xl">{title}</h2>
        <p className="mb-2">{subtitle}</p>
        <div>{children}</div>
        {isPaid && type ? (
          <BadgeStatus status="success">
            {type} at{" "}
            {paidAt ? formatDateTime(paidAt.toString()).dateTime : "N/A"}
          </BadgeStatus>
        ) : (
          type && <BadgeStatus status={STATUS.DANGER}>No {type}</BadgeStatus>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderCard;
