import { Loader } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

const DynamicButton = ({
  isPending,
  handleAction,
  icon,
  children,

  className,
}: {
  isPending?: boolean;
  handleAction?: (value?: unknown) => void;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}) => {
  return (
    /* btn${type ? "-" + type : ""} */
    <Button
      disabled={isPending}
      className={`btn focus-visible:ring-0 focus-visible:ring-offset-0  ${className} `}
      onClick={handleAction ? (value?) => handleAction(value) : undefined}
    >
      {isPending ? <Loader className="size-4 animate-spin" /> : icon}
      {children}
    </Button>
  );
};

export default DynamicButton;
