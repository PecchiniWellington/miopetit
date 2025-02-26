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
import { useCallback, useEffect, useState } from "react";

const useCartHandler = () => {
  const session = useSession();
  const userId = session?.data?.user?.id;

  const [storedValue, setValue] = useLocalStorage<ICartItem[]>("cart", []);
  const [isUpdating, setIsUpdating] = useState(false);
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);

  const [resume, setResume] = useState(
    calcPrice(userId ? cartItems : storedValue)
  );

  // ✅ Aggiungi un prodotto al carrello
  const addToCart = useCallback(
    async (product: IProduct) => {
      setIsUpdating(true);
      const newItem = {
        productId: product?.productId || product?.id,
        name: product?.name,
        price: product?.price.toString(),
        qty: 1,
        image: Array.isArray(product?.image)
          ? product?.image[0]
          : product?.image,
        slug: product?.slug,
      };

      if (!userId) {
        const cart = Array.isArray(storedValue) ? [...storedValue] : [];
        const existingItemIndex = cart.findIndex(
          (i) => i.productId === newItem.productId
        );

        if (existingItemIndex !== -1) {
          console.log(
            "existingItemIndex",
            existingItemIndex,
            cart[existingItemIndex]
          );
          cart[existingItemIndex].qty += 1;
        } else {
          cart.push(newItem);
        }

        console.log("CART", cart);
        setValue(cart);
        return;
      }

      try {
        await addItemToCart(newItem);
        const updatedCart = [...cartItems];
        const existingItemIndex = updatedCart.findIndex(
          (i) => i.productId === newItem.productId
        );

        if (existingItemIndex !== -1) {
          updatedCart[existingItemIndex].qty += 1;
        } else {
          updatedCart.push(newItem);
        }

        setCartItems(updatedCart);
        setResume(calcPrice(updatedCart));
        setIsUpdating(false);
      } catch (error) {
        console.error("❌ Errore nell'aggiunta al carrello:", error);
        setIsUpdating(false);
      }
    },
    [userId, storedValue, cartItems, setValue, setCartItems, setResume]
  );

  const removeFromCart = useCallback(
    async (product: ICartItem) => {
      setIsUpdating(true);

      const cart = Array.isArray(storedValue) ? storedValue : [];
      const existingItemIndex = cart.findIndex(
        (i) => i.productId === product.productId || i.productId === product.id
      );

      if (existingItemIndex !== -1) {
        if (cart[existingItemIndex].qty > 1) {
          cart[existingItemIndex].qty -= 1;
        } else {
          cart.splice(existingItemIndex, 1);
        }
      }

      try {
        await removeItemFromCart(product.productId);
        setValue([...cart]);
        setResume(calcPrice([...cart]));
      } catch (error) {
        console.error("❌ Errore nella rimozione dal carrello:", error);
      } finally {
        setIsUpdating(false);
      }
    },
    [storedValue, setValue, setResume]
  );

  // ✅ Cancella completamente un prodotto dal carrello
  const cancelFromCart = useCallback(
    async (productId: string) => {
      setIsUpdating(true);

      const cart = Array.isArray(storedValue) ? storedValue : [];
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
    [storedValue, setValue, setResume]
  );

  const getTotalUniqueProducts = useCallback(() => {
    if (userId) {
      return cartItems.length;
    } else {
      return storedValue.length;
    }
  }, [cartItems, storedValue, userId]);

  const fetchCart = useCallback(async () => {
    const backendCart = await getMyCart();
    const updatedCart = backendCart?.items || [];
    return updatedCart;
  }, []);

  const getProductQuantity = useCallback(
    (productId: string) => {
      const cart = userId ? cartItems : storedValue;
      const product = cart.find((item) => item.productId === productId);
      return product ? product.qty : 0;
    },
    [cartItems, storedValue, userId]
  );

  useEffect(() => {
    setCartCount(getTotalUniqueProducts());
  }, [cartItems, storedValue, userId]);

  useEffect(() => {
    const syncCartWithBackend = async () => {
      if (!userId) {
        setCartItems(storedValue);
        setCartCount(storedValue.length);
        setResume(calcPrice(storedValue));

        return;
      }

      try {
        const updatedCart = await fetchCart();
        /*  const updatedCart = Array.from({ length: 20 }, () => []); */
        /* const updatedCart = []; */

        let hasChanges = false; // 🔥 Flag per evitare aggiornamenti inutili

        if (storedValue.length > 0) {
          storedValue.forEach((storedItem) => {
            const existingItemIndex = updatedCart.findIndex(
              (cartItem) => cartItem.productId === storedItem.productId
            );

            if (existingItemIndex !== -1) {
              updatedCart[existingItemIndex].qty += storedItem.qty;
              hasChanges = true;
            } else {
              updatedCart.push(storedItem);
              hasChanges = true;
            }
          });

          if (hasChanges) {
            await addItemToCart(updatedCart);
            setValue([]); // ✅ Solo se c'erano cambiamenti
          }
        }

        if (JSON.stringify(cartItems) !== JSON.stringify(updatedCart)) {
          setCartItems(updatedCart);
          setCartCount(updatedCart.length);
          setResume(calcPrice(updatedCart));
        }
      } catch (error) {
        console.error("❌ Errore nella sincronizzazione del carrello:", error);
      }
    };

    setCartCount(getTotalUniqueProducts());

    syncCartWithBackend();
  }, [cartItems, fetchCart, storedValue, userId]);

  return {
    cartItems,
    addToCart,
    removeFromCart,
    cancelFromCart,
    getTotalUniqueProducts,
    getProductQuantity,
    resume,
    cartCount,
    isUpdating,
  };
};

export default useCartHandler;
