import { IProduct } from "@/core/validators";
import { useEffect, useState } from "react";

const DB_NAME = "CartProductDB";
const STORE_NAME = "cartProduct";
const DB_VERSION = 2;

const isIndexedDBAvailable = () =>
  typeof window !== "undefined" && "indexedDB" in window;

export function useIndexedDBCart() {
  const [cartProduct, setCartProduct] = useState<IProduct[]>([]);
  const [dbError, setDbError] = useState(false);

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

  const getCartProduct = async () => {
    const db = await openDatabase();
    if (!db) return [];

    try {
      const transaction = db.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);

      return new Promise<IProduct[]>((resolve) => {
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result as IProduct[]);
        request.onerror = () => {
          console.error("Errore nel recupero del carrello");
          resolve([]);
        };
      });
    } catch (error) {
      console.error("Errore durante l'accesso a IndexedDB", error);
      return [];
    }
  };

  const addToCartProduct = async (product: IProduct, qty: number) => {
    const db = await openDatabase();
    if (!db) return;

    try {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);

      // Controlla se il prodotto è già nel carrello
      const existingProduct = cartProduct.find(
        (item) => item.id === product?.id
      );
      if (existingProduct) {
        // Se già presente, aggiorna la quantità
        existingProduct.qty += qty;
        store.put(existingProduct);
      } else {
        const newProduct = { ...product, qty };
        store.put(newProduct);
      }

      setCartProduct((prev: IProduct[]) => {
        const updatedCartProduct = existingProduct
          ? prev.map((item) =>
              item.id === existingProduct.id ? existingProduct : item
            )
          : [...prev, { ...product, qty }];

        setTimeout(() => {
          window.dispatchEvent(
            new CustomEvent("cartProductUpdated", {
              detail: updatedCartProduct.length,
            })
          );
        }, 0);
        return updatedCartProduct;
      });
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

      setCartProduct((prev) => {
        const updatedCartProduct = prev.filter(
          (product) => product.id !== productId
        );
        setTimeout(() => {
          window.dispatchEvent(
            new CustomEvent("cartProductUpdated", {
              detail: updatedCartProduct.length,
            })
          );
        }, 0);
        return updatedCartProduct;
      });
    } catch (error) {
      console.error("Errore nella rimozione dal carrello", error);
    }
  };

  useEffect(() => {
    const updateCartProduct = async () => {
      const updatedCartProduct = await getCartProduct();
      setCartProduct(updatedCartProduct);
    };

    window.addEventListener("cartProductUpdated", updateCartProduct);
    updateCartProduct();

    return () => {
      window.removeEventListener("cartProductUpdated", updateCartProduct);
    };
  }, []);

  return { cartProduct, addToCartProduct, removeFromCartProduct, dbError };
}
