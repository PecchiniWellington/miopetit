"use client";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart2,
  DollarSign,
  Menu,
  MonitorCog,
  Settings,
  ShoppingBag,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const SIDEBAR_ITEMS = [
  {
    name: "Overview",
    icon: BarChart2,
    color: "#6366f1",
    href: "/overview",
  },
  {
    name: "Products",
    icon: ShoppingBag,
    color: "#8B5CF6",
    href: "/products",
  },
  { name: "Users", icon: Users, color: "#EC4899", href: "/users" },
  { name: "Sales", icon: DollarSign, color: "#10B981", href: "/sales" },
  {
    name: "Orders",
    icon: ShoppingCart,
    color: "#F59E0B",
    href: "/orders",
  },
  {
    name: "Analytics",
    icon: TrendingUp,
    color: "#3B82F6",
    href: "/analytics",
  },
  {
    name: "Settings",
    icon: Settings,
    color: "#6EE7B7",
    href: "/settings",
  },
  {
    name: "Configurations",
    icon: MonitorCog,
    color: "#ff33c5",
    href: "/configurations",
  },
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  return (
    <motion.div
      className={`relative z-10 shrink-0 transition-all duration-300 ease-in-out ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
      animate={{ width: isSidebarOpen ? 256 : 80 }}
    >
      <div className="flex h-full flex-col border-r border-gray-700 bg-gray-800/50 p-4 backdrop-blur-md">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="max-w-fit rounded-full p-2 transition-colors hover:bg-gray-700"
        >
          <Menu size={24} />
        </motion.button>

        <nav className="mt-8 grow">
          {SIDEBAR_ITEMS.map((item) => {
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
