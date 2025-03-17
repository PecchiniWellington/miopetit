"use client";
import BrandProductCard from "@/components/product/brand-product-card";
import { ICart, IProduct, IUser } from "@/core/validators";
import useLocalStorage from "@/hooks/use-local-storage";
import { useTranslations } from "next-intl";
import { useCallback } from "react";

export const FavoritesTab = ({
  user,
  myCart,
}: {
  user: IUser;
  myCart: ICart | null;
}) => {
  const t = useTranslations("Profile.FavoritesTab");
  const [storedFavorites] = useLocalStorage("favorites", []);
  const [storedValue] = useLocalStorage<{ productId: string; qty: number }[]>(
    "cart",
    []
  );

  const getProductQuantity = useCallback(
    (productId: string) => {
      if (!user.id) {
        const product = storedValue.find(
          (item) => item.productId === productId
        );
        return product ? product.qty : 0;
      } else {
        const product = myCart?.items?.find(
          (item) => item.productId === productId
        );

        return product ? product.qty : 0;
      }
    },
    [storedValue, user.id, myCart]
  );
  return (
    <div className="h-full rounded-lg bg-white  dark:bg-gray-800">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
        {t("title")}
      </h2>

      {storedFavorites.length === 0 ? (
        <p className="mt-4 text-gray-600">{t("no_favorites")}</p>
      ) : (
        <div className="mt-6 ">
          {storedFavorites.length === 0 ? (
            <p className="mt-4 text-gray-600">{t("no_favorites")}</p>
          ) : (
            <div className="mt-6 grid h-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {storedFavorites?.map((product: IProduct) => (
                <BrandProductCard
                  key={product.id}
                  product={product}
                  getProductQuantity={getProductQuantity(product.id)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
