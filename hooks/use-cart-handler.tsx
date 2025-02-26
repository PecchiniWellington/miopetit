import {
  addItemToCart,
  cancelItemFromCart,
  getMyCart,
  removeItemFromCart,
} from "@/core/actions/cart/cart.actions";
import { ICartItem, IProduct } from "@/core/validators";
import useLocalStorage from "@/hooks/use-local-storage";
import { calcPrice } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const useCartHandler = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  // ✅ Memorizza storedValue per evitare trigger inutili
  const [storedValue, setValue] = useLocalStorage<ICartItem[]>("cart", []);
  const storedCartMemo = useMemo(() => storedValue, [storedValue]);

  const [cart, setCart] = useState<ICartItem[]>([]);
  const [resume, setResume] = useState(calcPrice(storedCartMemo));
  const [isUpdating, setIsUpdating] = useState(false);

  const isFetching = useRef(false);

  // ✅ Sincronizza il carrello con il backend solo se necessario

  const syncCartWithBackend = useCallback(async () => {
    if (!userId) {
      setCart(storedCartMemo);
      setResume(calcPrice(storedCartMemo));
      return;
    } else {
      if (isFetching.current) return;
      isFetching.current = true;

      try {
        console.log("🔄 Sincronizzazione del carrello in corso...");
        const backendCart = await getMyCart();

        let hasChanges = false;

        storedCartMemo?.forEach((storedItem) => {
          const existingItem = backendCart?.items.find(
            (item) => item.productId === storedItem.productId
          );

          if (existingItem) {
            existingItem.qty += storedItem.qty;
          } else {
            backendCart?.items.push(storedItem);
          }

          hasChanges = true;
        });

        if (hasChanges) {
          await addItemToCart(backendCart?.items);
          setValue([]);
        }

        if (cart !== backendCart?.items) {
          setCart(backendCart?.items);
          setResume(calcPrice(backendCart?.items));
        }
      } catch (error) {
        console.error("❌ Errore nella sincronizzazione del carrello:", error);
      } finally {
        isFetching.current = false;
      }
    }
  }, []);

  useEffect(() => {
    syncCartWithBackend();
  }, []); // ✅ Ridotto il numero di trigger

  // ✅ Aggiungi un prodotto al carrello
  const addToCart = useCallback(
    async (product: IProduct) => {
      const newItem: ICartItem = {
        productId: product.productId || product.id,
        name: product.name,
        price: product.price.toString(),
        qty: 1,
        image: Array.isArray(product.image) ? product.image[0] : product.image,
        slug: product.slug,
      };

      if (!userId) {
        const updatedCart = [...storedCartMemo];
        const existingItem = updatedCart.find(
          (item) => item.productId === newItem.productId
        );

        if (existingItem) {
          existingItem.qty += 1;
        } else {
          updatedCart.push(newItem);
        }

        setValue(updatedCart);
        setResume(calcPrice(updatedCart));
        return;
      }

      try {
        await addItemToCart(newItem);
        const updatedCart = [...cart];
        const existingItem = updatedCart.find(
          (item) => item.productId === newItem.productId
        );

        if (existingItem) {
          existingItem.qty += 1;
        } else {
          updatedCart.push(newItem);
        }

        setCart(updatedCart);
        setResume(calcPrice(updatedCart));
      } catch (error) {
        console.error("❌ Errore nell'aggiunta al carrello:", error);
      }
    },
    [userId, storedCartMemo, cart, setValue]
  );

  // ✅ Rimuovi un singolo elemento dal carrello
  const removeFromCart = useCallback(
    async (product: ICartItem) => {
      setIsUpdating(true);
      const updatedCart = cart.map((item) =>
        item.productId === product.productId
          ? { ...item, qty: item.qty - 1 }
          : item
      );

      try {
        await removeItemFromCart(product.productId);
        setCart(updatedCart.filter((item) => item.qty > 0));
        setResume(calcPrice(updatedCart));
      } catch (error) {
        console.error("❌ Errore nella rimozione dal carrello:", error);
      } finally {
        setIsUpdating(false);
      }
    },
    [cart]
  );

  // ✅ Cancella completamente un prodotto dal carrello
  const cancelFromCart = useCallback(
    async (productId: string) => {
      setIsUpdating(true);

      try {
        await cancelItemFromCart(productId);
        const updatedCart = cart.filter((item) => item.productId !== productId);
        setCart(updatedCart);
        setResume(calcPrice(updatedCart));
      } catch (error) {
        console.error("❌ Errore nella cancellazione dal carrello:", error);
      } finally {
        setIsUpdating(false);
      }
    },
    [cart]
  );

  return {
    cartItems: cart,
    addToCart,
    removeFromCart,
    cancelFromCart,
    resume,
    isUpdating,
  };
};

export default useCartHandler;
