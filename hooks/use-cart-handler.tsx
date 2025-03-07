import {
  addItemToCart,
  cancelItemFromCart,
  getMyCart,
  removeItemFromCart,
} from "@/core/actions/cart/cart.actions";
import { ICartItem } from "@/core/validators";
import useLocalStorage from "@/hooks/use-local-storage";
import { calcPrice } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";

const useCartHandler = (session: any) => {
  const userId = session?.data?.user?.id;

  const [storedValue, setValue] = useLocalStorage<ICartItem[]>("cart", []);
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [resume, setResume] = useState(calcPrice(storedValue));
  const [isUpdating, setIsUpdating] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // 🔥 Evita mismatch SSR

  // ✅ Controlla se il client è montato per evitare errori di hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ✅ Recupera il carrello dal backend se l'utente è loggato
  const fetchCart = useCallback(async () => {
    if (!userId) return [];
    try {
      const backendCart = await getMyCart();
      if (backendCart && "items" in backendCart) {
        return backendCart.items;
      }
      return [];
    } catch (error) {
      console.error("❌ Errore nel recupero del carrello:", error);
      return [];
    }
  }, [userId]);

  const syncCartWithBackend = useCallback(async () => {
    if (!userId) return;

    try {
      const backendCart = await fetchCart();
      const localCart = storedValue;
      const count = backendCart.reduce((acc, item) => acc + item.qty, 0);

      if (!localCart.length) {
        setCartItems(backendCart);
        setResume(calcPrice(backendCart));
        setCartCount(count);
        return;
      }

      const mergedCart: ICartItem[] = [...backendCart];

      localCart.forEach((localItem) => {
        console.log({ localItem, mergedCart });
        const existingItemIndex = mergedCart.findIndex(
          (item) => item.productId === localItem.productId
        );

        if (existingItemIndex !== -1) {
          mergedCart[existingItemIndex].qty += localItem.qty;
        } else {
          mergedCart.push(localItem);
        }
      });

      if (JSON.stringify(backendCart) !== JSON.stringify(mergedCart)) {
        for (const item of mergedCart) {
          await addItemToCart(item);
        }
        setValue([]);
      }
      const countCart = mergedCart.reduce((acc, item) => acc + item.qty, 0);

      setCartItems(mergedCart);
      setResume(calcPrice(mergedCart));
      setCartCount(countCart);
    } catch (error) {
      console.error("❌ Errore nella sincronizzazione del carrello:", error);
    }
  }, [fetchCart, userId, storedValue, setValue]);

  // ✅ Sincronizza `cartItems` e `cartCount` in modo sicuro
  useEffect(() => {
    if (!isMounted) return;

    if (!userId) {
      const countCart = storedValue.reduce((acc, item) => acc + item.qty, 0);

      setCartItems(storedValue);
      setResume(calcPrice(storedValue));
      setCartCount(countCart);
      return;
    } else {
      console.log("🛒 Carrello sincronizzato:", cartItems);
      syncCartWithBackend();
    }
  }, [fetchCart, userId, storedValue, isMounted]);

  // ✅ Aggiungi un prodotto al carrello
  const addToCart = useCallback(
    async (product: ICartItem) => {
      setIsUpdating(true);
      const newItem: ICartItem = {
        productId: product.productId || (product as any).id,
        name: product?.name,
        price: product?.price.toString(),
        qty: product.qty || 1,
        image: Array.isArray(product?.image)
          ? product?.image[0]
          : product?.image,
        slug: product?.slug,
      };

      if (!userId) {
        const cart = [...storedValue];
        const existingItemIndex = cart.findIndex(
          (i) => i.productId === newItem.productId
        );

        if (existingItemIndex !== -1) {
          cart[existingItemIndex].qty += 1;
        } else {
          cart.push(newItem);
        }

        const countCart = cart.reduce((acc, item) => acc + item.qty, 0);

        setValue(cart);
        setCartItems(cart);
        setCartCount(countCart);
        return;
      }

      try {
        await addItemToCart(newItem);
        setCartItems((prevCart) => {
          const updatedCart = [...prevCart];
          const existingItemIndex = updatedCart.findIndex(
            (i) => i.productId === newItem.productId
          );

          if (existingItemIndex !== -1) {
            updatedCart[existingItemIndex].qty += 1;
          } else {
            updatedCart.push(newItem);
          }

          const countCart = updatedCart.reduce(
            (acc, item) => acc + item.qty,
            0
          );

          setResume(calcPrice(updatedCart));
          setCartCount(countCart);
          return updatedCart;
        });
      } catch (error) {
        console.error("❌ Errore nell'aggiunta al carrello:", error);
      } finally {
        setIsUpdating(false);
      }
    },
    [userId, storedValue, setValue]
  );

  const getProductQuantity = useCallback(
    (productId: string) => {
      if (!userId) {
        const product = storedValue.find(
          (item) => item.productId === productId
        );
        return product ? product.qty : 0;
      } else {
        const product = cartItems.find((item) => item.productId === productId);
        return product ? product.qty : 0;
      }
    },
    [cartItems, storedValue]
  );
  const cancelFromCart = useCallback(
    async (productId: string) => {
      setIsUpdating(true);

      const cart = Array.isArray(cartItems) ? cartItems : [];
      const updatedCart = cart.filter((i) => i.productId !== productId);

      try {
        await cancelItemFromCart(productId);
        setValue(updatedCart);
        setResume(calcPrice(updatedCart));
      } catch (error) {
        console.error(
          "❌ Errore nella cancellazione del prodotto dal carrello:",
          error
        );
      } finally {
        setIsUpdating(false);
      }
    },
    [cartItems, setValue, setResume]
  );

  // ✅ Rimuovi un singolo prodotto dal carrello
  const removeFromCart = useCallback(async (product: ICartItem) => {
    setIsUpdating(true);

    setCartItems((prevCart) => {
      const updatedCart = prevCart
        .map((item) =>
          item.productId === product.productId
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0);

      const countCart = updatedCart.reduce((acc, item) => acc + item.qty, 0);
      setResume(calcPrice(updatedCart));
      setCartCount(countCart);
      return updatedCart;
    });

    try {
      await removeItemFromCart(product.productId);
    } catch (error) {
      console.error("❌ Errore nella rimozione dal carrello:", error);
    } finally {
      setIsUpdating(false);
    }
  }, []);

  return {
    cartItems,
    addToCart,
    removeFromCart,
    getProductQuantity,
    cancelFromCart,
    resume,
    cartCount,
    isUpdating,
    isMounted, // 🔥 Per nascondere elementi fino a quando non è montato
  };
};

export default useCartHandler;
