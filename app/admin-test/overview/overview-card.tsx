import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface IOverviewProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  title: string;
  className?: string;
}

const OverviewCard = ({ children, icon, title, className }: IOverviewProps) => {
  return (
    <Card className={className}>
      <CardHeader className="flex w-full flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="h3-bold text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl">{children}</div>
      </CardContent>
    </Card>
  );
};

export default OverviewCard;
