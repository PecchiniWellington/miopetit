import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

type BrandCardProps = {
  iconSrc?: string;
  iconHref?: string;
  iconSize?: number;
  title?: string | React.ReactElement;
  description?: string;
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
  arragementChild?: string;
};

const BrandCard = ({
  iconSrc,
  iconHref = "/",
  iconSize = 40,
  title,
  description,
  children,
  header,
  footer,
  className = "",
  arragementChild = "",
}: BrandCardProps) => {
  return (
    <div
      className={clsx(
        "relative mx-auto w-full rounded-xl border border-gray-200 bg-white p-6 shadow-md",
        className
      )}
    >
      {/* HEADER SLOT */}
      {header && <div className="mb-4">{header}</div>}

      {/* ICON */}
      {iconSrc && (
        <div className="mb-4 flex justify-center">
          <Link href={iconHref}>
            <Image
              src={iconSrc}
              width={iconSize}
              height={iconSize}
              alt="logo"
              priority={true}
            />
          </Link>
        </div>
      )}

      {/* TITLE */}
      {title}

      {/* DESCRIPTION */}
      {description && (
        <p className="mb-4 text-center text-sm text-gray-600">{description}</p>
      )}

      {/* BODY */}
      <div className={arragementChild}>{children}</div>

      {/* FOOTER SLOT */}
      {footer && <div className="mt-6">{footer}</div>}
    </div>
  );
};

export default BrandCard;
