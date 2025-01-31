import { Loader, Minus } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { type } from "os";

const DynamicButton = ({
  isPending,
  handleAction,
  icon,
  children,
  disabled,
  className,
}: {
  isPending?: boolean;
  handleAction?: (value?: any) => void;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}) => {
  return (
    /* btn${type ? "-" + type : ""} */
    <Button
      disabled={isPending}
      className={`focus-visible:ring-0 focus-visible:ring-offset-0 btn  ${className} `}
      onClick={handleAction ? (value?) => handleAction(value) : undefined}
    >
      {isPending ? <Loader className="h-4 w-4 animate-spin" /> : icon}
      {children}
    </Button>
  );
};

export default DynamicButton;
