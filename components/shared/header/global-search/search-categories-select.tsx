"use client";
import { ICategory } from "@/core/validators";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BrandSelect from "../../brand-components/brand-select";
import { useSearch } from "./global-search-context";

// Dentro SearchCategorySelect:
const SearchCategorySelect = () => {
  const { searchCategories, isLoading, fetchSearchCategories } = useSearch();
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("Shared");
  const router = useRouter();

  useEffect(() => {
    if (isOpen && searchCategories.length === 0) {
      fetchSearchCategories();
    }
  }, [isOpen]);

  return (
    <BrandSelect
      value=""
      onValueChange={(value) => router.push(`/${value}`)}
      onOpenChange={setIsOpen}
      disabled={isLoading}
      placeholder={isLoading ? t("loading") : t("all")}
      options={
        isLoading
          ? []
          : (searchCategories as ICategory[]).map((x) => ({
              value: x.slug,
              label: x.name,
            }))
      }
    />
  );
};
export default SearchCategorySelect;
