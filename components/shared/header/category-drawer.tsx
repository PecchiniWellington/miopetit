import DynamicButton from "@/components/dynamic-button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { getProductCategories } from "@/lib/actions/product.actions";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

const CategoryDrawer = async () => {
  const categories = await getProductCategories();
  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <DynamicButton className="text-sm font-semibold">
          <MenuIcon />
        </DynamicButton>
      </DrawerTrigger>
      <DrawerContent className="h-full max-w-sm bg-slate-50 dark:bg-slate-700">
        <DrawerHeader>
          <DrawerTitle>Select a category</DrawerTitle>
          <div className="mt-4 space-y-1">
            {categories.map((x) => (
              <DynamicButton key={x.category} className="w-full justify-start">
                <DrawerClose asChild>
                  <Link href={`/search?category=${x.category}`}>
                    {x.category} ({x._count})
                  </Link>
                </DrawerClose>
              </DynamicButton>
            ))}
          </div>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

export default CategoryDrawer;
