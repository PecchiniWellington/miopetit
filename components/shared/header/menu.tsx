"use client";
import SidebarMenu from "@/components/custom-sidebar";
import menuCat from "@/core/db-static/mega-menu/menu-cats.json";
import menuDog from "@/core/db-static/mega-menu/menu-dogs.json";
import menuSmallAnimals from "@/core/db-static/mega-menu/menu-small-animals.json";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
const categoriesData = [
  ...(Array.isArray(menuDog) ? menuDog : [menuDog]),
  ...(Array.isArray(menuCat) ? menuCat : [menuCat]),
  ...(Array.isArray(menuSmallAnimals) ? menuSmallAnimals : [menuSmallAnimals]),
];

export default function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="rounded  px-2 py-1 text-white"
      >
        <MenuIcon />
      </button>

      {isSidebarOpen && (
        <SidebarMenu
          categories={categoriesData}
          onClose={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
