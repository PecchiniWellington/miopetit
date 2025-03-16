"use client";
import SidebarMenu from "@/components/shared/header/custom-sidebar";
import menuCat from "@/core/db-static/mega-menu/menu-cats.json";
import menuDog from "@/core/db-static/mega-menu/menu-dogs.json";
import menuSmallAnimals from "@/core/db-static/mega-menu/menu-small-animals.json";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import BrandButton from "../brand-components/brand-button";
const categoriesData = [
  ...(Array.isArray(menuDog) ? menuDog : [menuDog]),
  ...(Array.isArray(menuCat) ? menuCat : [menuCat]),
  ...(Array.isArray(menuSmallAnimals) ? menuSmallAnimals : [menuSmallAnimals]),
];

export default function Menu({ className }: { className: string }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={className}>
      <BrandButton variant="flat" onClick={() => setIsSidebarOpen(true)}>
        <MenuIcon />
      </BrandButton>

      {isSidebarOpen && (
        <SidebarMenu
          categories={categoriesData}
          onClose={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
