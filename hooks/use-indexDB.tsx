import { useEffect, useState } from "react";

const DB_NAME = "FavoritesDB";
const STORE_NAME = "favorites";
const DB_VERSION = 2;

interface Product {
  id: string;
  image: string;
  name: string;
  brand?: string;
  price: number;
  oldPrice?: number;
}

const isIndexedDBAvailable = () =>
  typeof window !== "undefined" && "indexedDB" in window;

export function useIndexedDB() {
  const [favorites, setFavorites] = useState<Product[]>([]);
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

  const getFavorites = async () => {
    const db = await openDatabase();
    if (!db) return [];

    try {
      const transaction = db.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);

      return new Promise<Product[]>((resolve) => {
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result as Product[]);
        request.onerror = () => {
          console.error("Errore nel recupero dei preferiti");
          resolve([]);
        };
      });
    } catch (error) {
      console.error("Errore durante l'accesso a IndexedDB", error);
      return [];
    }
  };

  const addFavorite = async (product: Product) => {
    const db = await openDatabase();
    if (!db) return;

    try {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      store.put(product);

      setFavorites((prev) => {
        const updatedFavorites = [...prev, product];
        setTimeout(() => {
          window.dispatchEvent(
            new CustomEvent("favoritesUpdated", {
              detail: updatedFavorites.length,
            })
          );
        }, 0);
        return updatedFavorites;
      });
    } catch (error) {
      console.error("Errore nell'aggiunta ai preferiti", error);
    }
  };

  const removeFavorite = async (productId: string) => {
    const db = await openDatabase();
    if (!db) return;

    try {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      store.delete(productId);

      setFavorites((prev) => {
        const updatedFavorites = prev.filter(
          (product) => product.id !== productId
        );
        setTimeout(() => {
          window.dispatchEvent(
            new CustomEvent("favoritesUpdated", {
              detail: updatedFavorites.length,
            })
          );
        }, 0);
        return updatedFavorites;
      });
    } catch (error) {
      console.error("Errore nella rimozione dai preferiti", error);
    }
  };

  useEffect(() => {
    const updateFavorites = async () => {
      const updatedFavorites = await getFavorites();
      setFavorites(updatedFavorites);
    };

    window.addEventListener("favoritesUpdated", updateFavorites);
    updateFavorites();

    return () => {
      window.removeEventListener("favoritesUpdated", updateFavorites);
    };
  }, []);

  return { favorites, addFavorite, removeFavorite, dbError };
}
