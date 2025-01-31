import { BadgeStatus } from "@/components/shared/badge-status";
import { Card, CardContent } from "@/components/ui/card";
import { STATUS } from "@/lib/constants";
import { formatDateTime } from "@/lib/utils";

import React from "react";

const OrderCard = ({
  children,
  isPaid,
  subtitle,
  paidAt,
  title,
  type,
}: any) => {
  return (
    <Card>
      <CardContent className="p-4 gap-4">
        <h2 className="text-xl pb-4">{title}</h2>
        <p className="mb-2">{subtitle}</p>
        <div>{children}</div>
        {isPaid && type ? (
          <BadgeStatus status="success">
            {type} at {formatDateTime(paidAt!).dateTime}
          </BadgeStatus>
        ) : (
          type && <BadgeStatus status={STATUS.DANGER}>No {type}</BadgeStatus>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderCard;
