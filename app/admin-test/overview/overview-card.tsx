import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { title } from "process";
import React from "react";

const OverviewCard = ({ children, icon, title, className }: any) => {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row justify-between items-center space-y-0 pb-2 w-full">
        <CardTitle className="text-sm font-medium h3-bold">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl">{children}</div>
      </CardContent>
    </Card>
  );
};

export default OverviewCard;
