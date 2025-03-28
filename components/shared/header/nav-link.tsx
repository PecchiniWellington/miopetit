"use client";
import { useLocale } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ILinkProps {
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
  href: string;
  label: string;
}

const NavLink = ({ setIsOpen, isOpen, href, label }: ILinkProps) => {
  const path = usePathname();
  const locale = useLocale();

  return (
    <div
      className={`cursor-pointer p-4 text-lg font-semibold text-gray-700 transition-all duration-300 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400 ${path === `/${locale}${href}` ? "text-indigo-600" : ""}`}
      onMouseEnter={() => setIsOpen && setIsOpen(true)}
      onMouseLeave={() => setIsOpen && setIsOpen(false)}
      onClick={() => setIsOpen && setIsOpen(!isOpen)}
    >
      <Link href={href}>{label}</Link>
    </div>
  );
};

export default NavLink;
