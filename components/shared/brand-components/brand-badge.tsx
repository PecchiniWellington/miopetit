import { XCircle } from "lucide-react";
import BrandButton from "./brand-button";

const BrandBadge = ({
  onCloseBadge,
  label,
  variant = "primary",
  className,
  icon,
}: {
  onCloseBadge?: () => void;
  label?: string | React.ReactElement;
  className?: string;
  variant?: "primary" | "success" | "danger" | "warning" | "default";
  icon?: React.ReactNode;
}) => {
  const variantClass = {
    primary: "badge-primary",
    success: "badge-success",
    danger: "badge-danger",
    warning: "badge-warning",
    default: "badge-default",
  };
  return (
    <div className={`badge-base ${variantClass[variant]}  ${className}`}>
      {label}
      {onCloseBadge && (
        <div className="ml-2 flex size-4 items-center rounded-full bg-white ">
          <BrandButton variant="ghost" onClick={onCloseBadge}>
            <XCircle className="size-full cursor-pointer text-orange-500 hover:text-red-600" />
          </BrandButton>
        </div>
      )}
      {icon ? (
        <span className="flex justify-center font-bold"> {icon}</span>
      ) : null}
    </div>
  );
};

export default BrandBadge;
