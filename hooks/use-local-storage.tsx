import { useEffect, useState } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
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

  // 🔥 Monitora localStorage e aggiorna lo stato automaticamente
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

  // 🔥 Aggiorna il localStorage e notifica tutti i componenti
  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
      window.dispatchEvent(new Event("localStorageUpdated")); // 🔥 Notifica gli altri componenti
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  };

  const removeItem = () => {
    try {
      setStoredValue(initialValue);
      window.localStorage.removeItem(key);
      window.dispatchEvent(new Event("localStorageUpdated")); // 🔥 Notifica gli altri componenti
    } catch (error) {
      console.error("Error removing from localStorage:", error);
    }
  };

  return [storedValue, setValue, removeItem] as const;
}

export default useLocalStorage;
