import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";

interface BrandButtonProps {
  type?: "submit" | "reset" | "button";
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  loading?: boolean;
  children?: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  iconPosition?: "left" | "right";
  variant?: "primary" | "secondary" | "danger" | "confirm" | "flat" | "warning";
  className?: string;
  ref?: React.ForwardedRef<HTMLButtonElement>;
}

const BrandButton = ({
  type = "button",
  disabled,
  onClick,
  children,
  loading,
  icon,
  iconPosition = "left",
  variant = "primary",
  className,
  ref,
}: BrandButtonProps) => {
  const variantClass = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    danger: "btn-danger",
    confirm: "btn-confirm",
    flat: "btn-flat",
    warning: "btn-warning",
  };

  return (
    <Button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`btn-base ${variantClass[variant]} ${loading ? "btn-loading" : ""} ${className}`}
    >
      {loading && <Loader2 className="size-4 animate-spin" />}
      {!loading && icon && iconPosition === "left" && icon}
      {children && <span>{children}</span>}
      {!loading && icon && iconPosition === "right" && icon}
    </Button>
  );
};

export default BrandButton;
