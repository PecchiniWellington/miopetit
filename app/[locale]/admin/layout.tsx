import Sidebar from "@/components/admin/common/Sidebar";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex  h-screen bg-gray-900 text-gray-100  ">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>

      <Sidebar />
      <div className="h-screen  w-full overflow-scroll  border">{children}</div>
    </div>
  );
}
