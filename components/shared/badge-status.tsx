import React from "react";
import { Badge } from "../ui/badge";
import { STATUS } from "@/lib/constants";

interface BadgeStatusProps {
  children: React.ReactNode;
  status: string;
}

export const BadgeStatus: React.FC<BadgeStatusProps> = ({
  children,
  status,
}) => {
  switch (status) {
    case STATUS.DANGER:
      return <Badge className="bg-red-100 text-red-700">{children}</Badge>;
    case STATUS.WARNING:
      return (
        <Badge className="bg-yellow-100 text-yellow-700">{children}</Badge>
      );
    case STATUS.SUCCESS:
      return <Badge className="bg-green-100 text-green-700">{children}</Badge>;
    default:
      return <Badge className="bg-gray-100 text-gray-700">{children}</Badge>;
  }
};

export default Badge;
