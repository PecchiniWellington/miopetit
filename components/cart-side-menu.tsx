"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getMyCart } from "@/core/actions/cart/cart.actions";
import { ICartItem } from "@/core/validators";
import useLocalStorage from "@/hooks/use-local-storage";
import { useMediaQuery } from "@/hooks/use-media-query";
import { DialogTitle } from "@radix-ui/react-dialog"; // Import per accessibilità
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"; // Per nascondere il titolo
import { ShoppingCart, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import BrandButton from "./shared/brand-components/brand-button";
import BrandNotificationNumber from "./shared/notification-number";

const CartSideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [showCartButton, setShowCartButton] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const session = useSession();
  const [storedValue] = useLocalStorage<ICartItem[]>("cart", []);
  const t = useTranslations();

  // Fetch ottimizzato del carrello
  const fetchCart = useCallback(async () => {
    const cartResponse = await getMyCart();
    if (cartResponse) {
      setCartItems(cartResponse.items || []);
    }
  }, []);

  useEffect(() => {
    if (session.data?.user?.id) {
      fetchCart();
    }
    if (typeof window !== "undefined") {
      setCartItems(storedValue);
    }
  }, [fetchCart, session.data?.user?.id, storedValue]);

  // Mostra il pulsante in base allo scroll (funziona sia su mobile che su desktop)
  useEffect(() => {
    const handleScroll = () => {
      setShowCartButton(window.scrollY > 150);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calcola il totale e la quantità dei prodotti
  const { totalPrice, totalCount } = useMemo(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + Number(item.price) * Number(item.qty),
      0
    );
    const count = cartItems.reduce((acc, item) => acc + item.qty, 0);
    return { totalPrice: total, totalCount: count };
  }, [cartItems]);

  const shippingCost = totalPrice > 49 ? 0 : 5.99;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {showCartButton && (
        <SheetTrigger asChild>
          <BrandButton
            className={`fixed bottom-5 right-5 z-50 flex items-center ${
              isMobile ? "p-3 shadow-md" : "gap-2 px-5 py-2 shadow-lg"
            }  transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none`}
            icon={<ShoppingCart className="size-6" />}
          >
            {totalCount > 0 && (
              <BrandNotificationNumber>{totalCount}</BrandNotificationNumber>
            )}
            {!isMobile && t("Shared.cart")}
          </BrandButton>
        </SheetTrigger>
      )}
      <SheetContent
        side="right"
        className="w-96 rounded-l-2xl bg-slate-50 shadow-lg sm:w-96 [&>button]:hidden"
      >
        <DialogTitle asChild>
          <VisuallyHidden>
            {t("Shared.your")} {t("Shared.cart")}
          </VisuallyHidden>
        </DialogTitle>
        {/* Intestazione */}
        <div className="flex items-center justify-between rounded-t-2xl border-b bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-white">
          <h2 className="text-lg font-semibold">
            {t("Shared.your")} {t("Shared.cart")}
          </h2>
          <BrandButton onClick={() => setIsOpen(false)} className="p-1">
            <X className="size-6 text-white" />
          </BrandButton>
        </div>

        {/* Lista dei prodotti */}
        <ScrollArea className="h-[60vh] p-4">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">
              {t("Shared.cart_is_empty")}
            </p>
          ) : (
            cartItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg bg-white p-3 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={item.image || "/images/placeholder.jpg"}
                    alt={item.name}
                    width={50}
                    height={50}
                    className="rounded-lg object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">€{item.price}</p>
                  </div>
                </div>
                <p className="text-sm font-medium">x{item.qty}</p>
              </div>
            ))
          )}
        </ScrollArea>

        {/* Resoconto Ordine */}
        {cartItems.length > 0 && (
          <div className="sticky bottom-8 mt-[100%] rounded-b-2xl border-t bg-white p-4 shadow-lg">
            <div className="flex justify-between text-sm text-gray-700">
              <span>{t("Shared.subtotal")}:</span>
              <span>€{totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-700">
              <span>{t("Shared.shipping")}:</span>
              <span className={shippingCost === 0 ? "text-green-500" : ""}>
                {shippingCost === 0 ? "Gratis" : `€${shippingCost.toFixed(2)}`}
              </span>
            </div>
            <div className="mt-2 flex justify-between border-t pt-2 text-lg font-bold">
              <span>{t("Shared.total")}:</span>
              <span>€{(totalPrice + shippingCost).toFixed(2)}</span>
            </div>

            <Link href="/shipping-address">
              <BrandButton className="mt-4">
                {t("Shared.proceed_to")} {t("Shared.checkout")}
              </BrandButton>
            </Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSideMenu;
