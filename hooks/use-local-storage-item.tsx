import { useEffect, useState } from "react";

function useLocalStorageItem<T>(key: string, initialValue: T[] | "") {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window === "undefined") return initialValue;
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return initialValue;
    }
  });

  // 🔥 Aggiorna lo stato quando riceve il custom event
  useEffect(() => {
    const syncStorage = () => {
      try {
        const item = window.localStorage.getItem(key);
        setStoredValue(item ? JSON.parse(item) : initialValue);
      } catch (error) {
        console.error("Error reading from localStorage:", error);
      }
    };

    window.addEventListener("localStorageUpdated", syncStorage);
    return () => {
      window.removeEventListener("localStorageUpdated", syncStorage);
    };
  }, [key, initialValue]);

  const updateLocalStorage = (newValue: T[]) => {
    window.localStorage.setItem(key, JSON.stringify(newValue));
    setStoredValue(newValue);
    window.dispatchEvent(new Event("localStorageUpdated"));
  };

  const addItem = (item: T) => {
    const storedItems = window.localStorage.getItem(key);
    let newValue;

    if (storedItems) {
      const parsedItems = JSON.parse(storedItems);
      const existingItemIndex = parsedItems.findIndex(
        (i: T) => i.productId === item.productId
      );
      if (existingItemIndex !== -1) {
        parsedItems[existingItemIndex].qty += 1;
        newValue = [...parsedItems];
      } else {
        newValue = [...parsedItems, item];
      }
    } else {
      newValue = [item];
    }

    updateLocalStorage(newValue);
  };

  const removeItem = (productId: string) => {
    const storedItems = window.localStorage.getItem(key);
    if (storedItems) {
      const parsedItems = JSON.parse(storedItems);
      const newValue = parsedItems.filter(
        (item: T) => item.productId !== productId
      );
      updateLocalStorage(newValue);
    }
  };

  const decreaseItem = (productId: string) => {
    const storedItems = window.localStorage.getItem(key);
    if (storedItems) {
      const parsedItems = JSON.parse(storedItems);
      const existingItemIndex = parsedItems.findIndex(
        (item: T) => item.productId === productId
      );
      if (existingItemIndex !== -1) {
        if (parsedItems[existingItemIndex].qty > 1) {
          parsedItems[existingItemIndex].qty -= 1;
          const newValue = [...parsedItems];
          updateLocalStorage(newValue);
        } else {
          removeItem(productId);
        }
      }
    }
  };

  return [storedValue, addItem, removeItem, decreaseItem] as const;
}

export default useLocalStorageItem;
