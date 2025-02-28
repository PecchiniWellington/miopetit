import { useEffect, useState } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
  // ✅ Controlla se siamo nel client per evitare problemi di SSR
  const isClient = typeof window !== "undefined";

  // ✅ Recupera il valore dal localStorage solo se siamo nel client
  const getStoredValue = () => {
    if (!isClient) return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("❌ Error reading from localStorage:", error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(getStoredValue);

  // ✅ Aggiorna localStorage e lo stato quando cambia `storedValue`
  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      if (isClient) {
        window.localStorage.setItem(key, JSON.stringify(value));
        window.dispatchEvent(new Event("localStorageUpdated"));
      }
    } catch (error) {
      console.error("❌ Error writing to localStorage:", error);
    }
  };

  // ✅ Rimuove l'elemento dal localStorage e resetta lo stato
  const removeItem = () => {
    try {
      if (isClient) {
        window.localStorage.removeItem(key);
        window.dispatchEvent(new Event("localStorageUpdated"));
      }
      setStoredValue(initialValue);
    } catch (error) {
      console.error("❌ Error removing from localStorage:", error);
    }
  };

  // ✅ Sincronizza i cambiamenti del localStorage tra diverse schede
  useEffect(() => {
    if (!isClient) return;

    const syncStorage = () => {
      setStoredValue(getStoredValue());
    };

    window.addEventListener("localStorageUpdated", syncStorage);
    window.addEventListener("storage", syncStorage);

    return () => {
      window.removeEventListener("localStorageUpdated", syncStorage);
      window.removeEventListener("storage", syncStorage);
    };
  }, [key, isClient]);

  return [storedValue, setValue, removeItem] as const;
}

export default useLocalStorage;
