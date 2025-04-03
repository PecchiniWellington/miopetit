"use client";
import Header from "@/components/admin/common/Header";
import Sidebar from "@/components/admin/common/Sidebar";
import { usePathname } from "next/navigation";

function formatTitleFromPath(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean); // rimuove vuoti
  const cleaned = parts.slice(1); // rimuove lingua (prima parte)

  return cleaned
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" "); // Create User
}

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const pageTitle = formatTitleFromPath(pathname);

  return (
    <div className="flex  h-screen bg-gray-900 text-gray-100  ">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>

      <Sidebar />
      <div className="h-screen  w-full overflow-scroll  border">
        <Header title={pageTitle} />
        {children}
      </div>
    </div>
  );
}
