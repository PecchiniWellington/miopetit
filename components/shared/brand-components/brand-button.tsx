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
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "confirm"
    | "flat"
    | "warning"
    | "tertiary"
    | "outline"
    | "outline-white"
    | "ghost"
    | "ghost-white";
  className?: string;
  ref?: React.ForwardedRef<HTMLButtonElement>;
  size?: "small" | "medium" | "large";
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
  size = "medium",
}: BrandButtonProps) => {
  const variantClass = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    tertiary: "btn-tertiary",
    danger: "btn-danger",
    confirm: "btn-confirm",
    flat: "btn-flat",
    warning: "btn-warning",
    outline: "btn-outline",
    "outline-white": "btn-outline-white",
    ghost: "btn-ghost",
    "ghost-white": "btn-ghost-white",
  };

  const sizeClass = {
    small: "btn-small",
    medium: "btn-medium",
    large: "btn-large",
  };

  return (
    <Button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`btn-base  ${variantClass[variant]} ${sizeClass[size]} ${loading ? "btn-loading" : ""} ${className}`}
    >
      {loading && <Loader2 className="size-4 animate-spin" />}
      {!loading && icon && iconPosition === "left" && icon}
      {children && <span className="flex items-center gap-2">{children}</span>}
      {!loading && icon && iconPosition === "right" && icon}
    </Button>
  );
};

export default BrandButton;
