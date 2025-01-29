import { Card, CardContent } from "@/components/ui/card";
import { formatDateTime } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
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
        {isPaid ? (
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            {type} at {formatDateTime(paidAt!).dateTime}
          </Badge>
        ) : (
          <Badge variant="destructive" className="bg-red-100 text-red-700 ">
            Not {type}
          </Badge>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderCard;
