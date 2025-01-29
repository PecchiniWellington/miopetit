"use client";
import { USER_ROUTES } from "@/lib/constants/routes";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { title: "Profile", href: USER_ROUTES.PROFILE },
  { title: "Orders", href: USER_ROUTES.ORDERS },
];

const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {links.map((link) => (
        <Link
          href={link.href}
          key={link.href}
          className={cn(
            "text-sm font-medium  transition-colors hover:text-black",
            pathname.includes(link.href) ? " " : "text-slate-400"
          )}
        >
          {link.title}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
