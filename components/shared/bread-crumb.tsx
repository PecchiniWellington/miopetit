"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandBadge from "./brand-components/brand-badge";

interface BreadcrumbProps {
  separator?: React.ReactNode;
}

export default function Breadcrumb({
  separator = <ChevronRight className="size-4 text-gray-400" />,
}: BreadcrumbProps) {
  const pathname = usePathname();
  const supportedLocales = ["it", "en"];

  let segments = pathname.split("/").filter(Boolean);

  if (supportedLocales.includes(segments[0])) {
    segments = segments.slice(1);
  }

  const excludedPages = ["sign-in", "sign-out"];
  if (excludedPages.includes(segments[0])) {
    return null;
  }

  if (segments.length === 0) return null;

  return (
    <nav className="wrapper py-5">
      <ul className="flex flex-wrap items-center gap-1 text-sm">
        <li>
          <BrandBadge variant="default" label={<Link href="/">🏠 Home</Link>} />
        </li>

        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const isLast = index === segments.length - 1;

          return (
            <li key={index} className="flex items-center gap-1">
              {separator}
              {isLast ? (
                <BrandBadge
                  variant="success"
                  label={
                    <span className="font-bold">
                      {decodeURIComponent(segment)}
                    </span>
                  }
                />
              ) : (
                <BrandBadge
                  label={
                    <Link href={href} className="font-bold">
                      {" "}
                      {decodeURIComponent(segment)}
                    </Link>
                  }
                />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
