import { IOrderItem, IProduct } from "@/core/validators";
import { useCallback, useEffect, useRef, useState } from "react";

const DB_NAME = "CartProductDB";
const STORE_NAME = "cartProduct";
const ADDRESS_STORE = "userAddress";
const DB_VERSION = 2;

const isIndexedDBAvailable = () =>
  typeof window !== "undefined" && "indexedDB" in window;

export function useIndexedDBCart() {
  const [cartProduct, setCartProduct] = useState<IProduct[]>([]);
  const [dbError, setDbError] = useState(false);
  const isUpdatingRef = useRef(false);
  const prevCartRef = useRef<IProduct[]>([]);

  const openDatabase = async () => {
    if (!isIndexedDBAvailable()) {
      console.error("IndexedDB non è disponibile nel browser.");
      setDbError(true);
      return null;
    }

    return new Promise<IDBDatabase | null>((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: "id" });
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => {
        console.error("Errore nell'apertura di IndexedDB", request.error);
        setDbError(true);
        reject(null);
      };
    });
  };

  const getCartProduct = useCallback(async () => {
    const db = await openDatabase();
    if (!db) return [];

    return new Promise<IProduct[]>((resolve) => {
      try {
        const transaction = db.transaction(STORE_NAME, "readonly");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result as IProduct[]);
        request.onerror = () => {
          console.error("Errore nel recupero del carrello");
          resolve([]);
        };
      } catch (error) {
        console.error("Errore durante l'accesso a IndexedDB", error);
        resolve([]);
      }
    });
  }, []);

  const addToCartProduct = async (product: IOrderItem, qty: number) => {
    const db = await openDatabase();
    if (!db) return;

    try {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const existingProduct = cartProduct.find(
        (item) => item.id === product?.productId
      );

      console.log("Existing Product", existingProduct, product);

      if (existingProduct) {
        existingProduct.qty += qty;
        store.put(existingProduct);
      } else {
        store.put({
          ...product,
          qty,
          productId: product.productId,
        });
      }

      // 🔥 Dispatcha l'evento solo una volta
      window.dispatchEvent(new CustomEvent("cartProductUpdated"));
    } catch (error) {
      console.error("Errore nell'aggiunta al carrello", error);
    }
  };

  const removeFromCartProduct = async (productId: string) => {
    const db = await openDatabase();
    if (!db) return;

    try {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      store.delete(productId);

      setCartProduct((prev) =>
        prev.filter((product) => product.id !== productId)
      );
      window.dispatchEvent(new CustomEvent("cartProductUpdated"));
    } catch (error) {
      console.error("Errore nella rimozione dal carrello", error);
    }
  };

  const updateCartProduct = useCallback(async () => {
    if (isUpdatingRef.current) return;
    isUpdatingRef.current = true;

    const updatedCartProduct = await getCartProduct();

    // ✅ Evita aggiornamenti inutili
    if (
      JSON.stringify(prevCartRef.current) !== JSON.stringify(updatedCartProduct)
    ) {
      console.log("🔄 Cart updated:", updatedCartProduct);
      setCartProduct(updatedCartProduct);
      prevCartRef.current = updatedCartProduct;
    }

    isUpdatingRef.current = false;
  }, [getCartProduct]);

  const saveUserAddress = async (address) => {
    const db = await openDatabase();
    if (!db) return;

    try {
      const transaction = db.transaction(ADDRESS_STORE, "readwrite");
      const store = transaction.objectStore(ADDRESS_STORE);
      store.put({ id: "user-address", ...address });
    } catch (error) {
      console.error("Errore nel salvataggio dell'indirizzo", error);
    }
  };

  // ✅ Recupera l'indirizzo dal IndexedDB
  const getUserAddress = async () => {
    const db = await openDatabase();
    if (!db) return null;

    return new Promise((resolve) => {
      try {
        const transaction = db.transaction(ADDRESS_STORE, "readonly");
        const store = transaction.objectStore(ADDRESS_STORE);
        const request = store.get("user-address");

        request.onsuccess = () => resolve(request.result || null);
        request.onerror = () => {
          console.error("Errore nel recupero dell'indirizzo");
          resolve(null);
        };
      } catch (error) {
        console.error("Errore durante l'accesso a IndexedDB", error);
        resolve(null);
      }
    });
  };

  useEffect(() => {
    const handleCartUpdate = () => updateCartProduct();

    window.addEventListener("cartProductUpdated", handleCartUpdate);

    updateCartProduct(); // ✅ Inizializza solo al primo render

    return () => {
      window.removeEventListener("cartProductUpdated", handleCartUpdate);
    };
  }, []);

  return {
    cartProduct,
    addToCartProduct,
    removeFromCartProduct,
    saveUserAddress, // 🆕 Salva indirizzo
    getUserAddress, // 🆕 Recupera indirizzo
    dbError,
  };
}
