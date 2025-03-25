"use client";
import ROLES from "@/lib/constants/roles";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart2,
  Building,
  DollarSign,
  Menu,
  MonitorCog,
  Settings,
  ShoppingBag,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SIDEBAR_ITEMS = [
  {
    name: "Overview",
    icon: BarChart2,
    color: "#6366f1",
    href: "/overview",
    role: [ROLES.ADMIN],
  },
  {
    name: "Products",
    icon: ShoppingBag,
    color: "#8B5CF6",
    href: "/products",
    role: [ROLES.ADMIN, ROLES.CONTRIBUTOR],
  },
  {
    name: "Users",
    icon: Users,
    color: "#EC4899",
    href: "/users",
    role: [ROLES.ADMIN],
  },
  {
    name: "Sales",
    icon: DollarSign,
    color: "#10B981",
    href: "/sales",
    role: [ROLES.ADMIN],
  },
  {
    name: "Orders",
    icon: ShoppingCart,
    color: "#F59E0B",
    href: "/orders",
    role: [ROLES.ADMIN],
  },
  {
    name: "Analytics",
    icon: TrendingUp,
    color: "#3B82F6",
    href: "/analytics",
    role: [ROLES.ADMIN],
  },
  {
    name: "Settings",
    icon: Settings,
    color: "#6EE7B7",
    href: "/settings",
    role: [ROLES.ADMIN, ROLES.CONTRIBUTOR],
  },
  {
    name: "Page Builder",
    icon: Building,
    color: "#ff5733", // Changed color
    href: "/page-builder",
    role: [ROLES.ADMIN, ROLES.CONTRIBUTOR],
  },
  {
    name: "Configurations",
    icon: MonitorCog,
    color: "#ff33c5",
    href: "/configurations",
    role: [ROLES.ADMIN],
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean | null>(null);
  const user = useSession();

  // Determina se la sidebar deve essere aperta o chiusa in base alla larghezza dello schermo
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false); // Chiusa per i dispositivi mobili
    } else {
      setIsSidebarOpen(true); // Aperta per i desktop
    }
  }, []);

  // Se lo stato è null (ancora in fase di inizializzazione), non renderizza nulla
  if (isSidebarOpen === null) return null;

  return (
    <motion.div
      className={`relative z-10 shrink-0 transition-all duration-300 ease-in-out ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
      animate={{ width: isSidebarOpen ? 256 : 80 }}
    >
      <div className="flex h-full flex-col border-r border-gray-700 bg-gray-800/50 p-4 backdrop-blur-md">
        {/* Bottone per aprire/chiudere la sidebar */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="max-w-fit rounded-full p-2 transition-colors hover:bg-gray-700"
        >
          <Menu size={24} />
        </motion.button>

        {/* Menu di navigazione */}
        <nav className="mt-8 grow">
          {SIDEBAR_ITEMS.filter((item) =>
            user.data?.user.role
              ? item.role.includes(user.data.user.role as ROLES)
              : false
          ).map((item) => {
            const isActive =
              (pathname.includes(item.href) && item.href.length > 1) ||
              pathname === item.href;

            return (
              <Link key={item.href} href={`/admin${item.href}`}>
                <motion.div
                  className={`${isActive ? "bg-gray-700" : ""} mb-2 flex items-center rounded-lg p-4 text-sm font-medium transition-colors hover:bg-gray-700`}
                >
                  <item.icon
                    size={20}
                    style={{ color: item.color, minWidth: "20px" }}
                  />
                  <AnimatePresence>
                    {isSidebarOpen && (
                      <motion.span
                        className="ml-4 whitespace-nowrap"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2, delay: 0.3 }}
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>
            );
          })}
        </nav>
      </div>
    </motion.div>
  );
};

export default Sidebar;
