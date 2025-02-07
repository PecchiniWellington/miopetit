"use client";
import SidebarMenu from "@/components/custom-sidebar";
import menuCat from "@/db/mega-menu/menu-cats.json";
import menuDog from "@/db/mega-menu/menu-dogs.json";
import menuSmallAnimals from "@/db/mega-menu/menu-small-animals.json";
import { EllipsisVertical } from "lucide-react";
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
        className="rounded bg-primary-600 px-2 py-1 text-white"
      >
        <EllipsisVertical />
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
