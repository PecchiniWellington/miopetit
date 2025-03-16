import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";

interface BrandButtonProps {
  type?: "submit" | "reset" | "button";
  onClick?: (...args: never[]) => void;
  loading?: boolean;
  children?: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  iconPosition?: "left" | "right";
  variant?: "primary" | "secondary" | "danger" | "confirm" | "flat";
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
}: BrandButtonProps) => {
  const variantClass = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    danger: "btn-danger",
    confirm: "btn-confirm",
    flat: "btn-flat",
  };

  return (
    <Button
      onClick={type !== "submit" ? onClick : undefined}
      disabled={disabled}
      type={type}
      className={`btn-base ${variantClass[variant]} ${loading ? "btn-loading" : ""}`}
    >
      {loading && <Loader2 className="size-4 animate-spin" />}

      {!loading && icon && iconPosition === "left" && icon}

      {children && <span>{children}</span>}

      {!loading && icon && iconPosition === "right" && icon}
    </Button>
  );
};

export default BrandButton;
