"use client";

import ROLES from "@/lib/constants/roles";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart2,
  BriefcaseMedical,
  Cat,
  ChevronDown,
  Dog,
  DollarSign,
  Heart,
  HeartHandshake,
  Layout,
  Menu,
  MonitorCog,
  PawPrint,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Squirrel,
  TrendingUp,
  User,
  Users,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SIDEBAR_ITEMS = [
  {
    name: "Overview",
    icon: Layout,
    color: "#6366f1",
    href: "/overview",
    role: [ROLES.ADMIN, ROLES.SUPER_ADMIN],
  },
  {
    name: "Products",
    icon: ShoppingCart,
    color: "#8B5CF6",
    href: "/products",
    role: [ROLES.ADMIN, ROLES.SUPER_ADMIN, ROLES.RETAILER],
  },
  {
    name: "Users",
    icon: User,
    color: "#EC4899",
    href: "/users",
    role: [ROLES.ADMIN, ROLES.SUPER_ADMIN],
    children: [
      {
        name: "All",
        color: "#8B5CF6",
        icon: Users,
        href: "/users/all",
        role: [ROLES.ADMIN, ROLES.SUPER_ADMIN],
      },
      {
        name: "Volunteers",
        color: "#4ADE80",
        icon: Users,
        href: "/users/volunteers",
        role: [ROLES.ADMIN, ROLES.SUPER_ADMIN],
      },
      {
        name: "Veterinarians",
        color: "#F59E0B",
        icon: BriefcaseMedical,
        href: "/users/veterinarians",
        role: [ROLES.ADMIN, ROLES.SUPER_ADMIN],
      },
      {
        name: "Users",
        color: "#F472B6",
        icon: HeartHandshake,
        href: "/users/normal-users",
        role: [ROLES.SUPER_ADMIN],
      },
      {
        name: "Retailers",
        color: "#ff5733",
        icon: ShoppingBag,
        href: "/users/retailers",
        role: [ROLES.SUPER_ADMIN],
      },
      {
        name: "Admins",
        color: "#6366f1",
        icon: MonitorCog,
        href: "/users/admins",
        role: [ROLES.SUPER_ADMIN],
      },
    ],
  },
  {
    name: "Sales",
    icon: DollarSign,
    color: "#10B981",
    href: "/sales",
    role: [ROLES.SUPER_ADMIN],
  },
  {
    name: "Orders",
    icon: BarChart2,
    color: "#F59E0B",
    href: "/orders",
    role: [ROLES.SUPER_ADMIN],
  },
  {
    name: "Animals",
    icon: PawPrint,
    color: "#10B981", // verde smeraldo
    href: "/animals",
    role: [ROLES.ADMIN],
    children: [
      {
        name: "All",
        color: "#F472B6", // giallo dorato
        icon: Heart,
        href: "/animals/all",
        role: [ROLES.ADMIN, ROLES.SUPER_ADMIN],
      },
      {
        name: "Cani",
        color: "#FBBF24", // giallo dorato
        icon: Dog,
        href: "/animals/dogs",
        role: [ROLES.ADMIN, ROLES.SUPER_ADMIN],
      },
      {
        name: "Cat",
        color: "#FB7185", // rosa fragola
        icon: Cat,
        href: "/animals/cats",
        role: [ROLES.ADMIN, ROLES.SUPER_ADMIN],
      },

      {
        name: "Piccoli animali",
        color: "#A78BFA", // lilla
        icon: Squirrel, // simile a un roditore/piccolo animale
        href: "/animals/small-animals",
        role: [ROLES.ADMIN, ROLES.SUPER_ADMIN],
      },
    ],
  },

  {
    name: "Analytics",
    icon: TrendingUp,
    color: "#3B82F6",
    href: "/analytics",
    role: [ROLES.SUPER_ADMIN],
  },
  {
    name: "Settings",
    icon: Settings,
    color: "#6EE7B7",
    href: "/settings",
    role: [ROLES.ADMIN, ROLES.SUPER_ADMIN, ROLES.RETAILER],
    children: [
      {
        name: "Profilo",
        color: "#4ADE80",
        icon: User,
        href: "/settings/profile",
        role: [ROLES.ADMIN, ROLES.SUPER_ADMIN, ROLES.RETAILER],
      },
      {
        name: "Pagina pubblica",
        color: "#F472B6",
        icon: Layout,
        href: "/settings/page-settings",
        role: [ROLES.ADMIN, ROLES.SUPER_ADMIN, ROLES.RETAILER],
      },
    ],
  },
  {
    name: "Contributors",
    icon: Users,
    color: "#ff5733",
    href: "/contributors",
    role: [ROLES.SUPER_ADMIN],
  },
  {
    name: "Configurations",
    icon: Settings,
    color: "#ff33c5",
    href: "/configurations",
    role: [ROLES.ADMIN, ROLES.SUPER_ADMIN],
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const user = useSession();

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  }, []);

  if (isSidebarOpen === null) return null;

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
          {SIDEBAR_ITEMS.filter((item) =>
            user.data?.user.role
              ? item.role.includes(user.data.user.role as ROLES)
              : false
          ).map((item) => {
            const isActive =
              pathname === `/admin${item.href}` ||
              (item.children &&
                item.children.some(
                  (child) => `/admin${child.href}` === pathname
                ));

            const isOpen = openMenu === item.name;

            if (item.children) {
              return (
                <div key={item.name} className="mb-2">
                  <motion.div
                    onClick={() => setOpenMenu(isOpen ? null : item.name)}
                    className={`flex cursor-pointer items-center justify-between rounded-lg p-4 text-sm font-medium transition-colors hover:bg-gray-700 ${
                      isActive ? "bg-gray-700" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <item.icon
                        size={20}
                        style={{ color: item.color, minWidth: "20px" }}
                      />
                      <AnimatePresence>
                        {isSidebarOpen && (
                          <motion.span
                            className="whitespace-nowrap"
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{ duration: 0.2, delay: 0.3 }}
                          >
                            {item.name}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                    {isSidebarOpen && (
                      <ChevronDown
                        className={`transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
                        size={16}
                      />
                    )}
                  </motion.div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="ml-6 mt-2 space-y-1"
                      >
                        {item.children
                          .filter((child) =>
                            user.data?.user.role
                              ? !child.role ||
                                child.role.includes(
                                  user.data.user.role as ROLES
                                )
                              : false
                          )
                          .map((child) => (
                            <Link key={child.href} href={`/admin${child.href}`}>
                              <div className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-300 hover:bg-gray-700">
                                <child.icon size={16} color={child.color} />
                                {child.name}
                              </div>
                            </Link>
                          ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

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
