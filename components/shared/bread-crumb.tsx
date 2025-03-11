"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface BreadcrumbProps {
  separator?: string;
}

export default function Breadcrumb({ separator = "-" }: BreadcrumbProps) {
  const pathname = usePathname();

  // Definisci le lingue supportate
  const supportedLocales = ["it", "en"];

  // Ottieni i segmenti dell'URL e filtra quelli vuoti
  let segments = pathname.split("/").filter(Boolean);

  // Se il primo segmento è una lingua supportata, rimuovilo
  if (supportedLocales.includes(segments[0])) {
    segments = segments.slice(1);
  }

  // Controlla se siamo in una pagina di sign-in o sign-out
  const excludedPages = ["sign-in", "sign-out"];
  if (excludedPages.includes(segments[0])) {
    return null;
  }

  if (segments.length === 0) return null;

  return (
    <nav className="wrapper py-4 text-sm text-gray-600">
      <ul className="flex items-center space-x-2">
        <li>
          <Link href="/" className="text-blue-600 hover:underline">
            Home
          </Link>
        </li>

        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const isLast = index === segments.length - 1;

          return (
            <li key={index} className="flex items-center">
              <span className="mx-1">{separator}</span>
              {isLast ? (
                <span className="text-gray-500">
                  {decodeURIComponent(segment)}
                </span>
              ) : (
                <Link href={href} className="text-blue-600 hover:underline">
                  {decodeURIComponent(segment)}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
