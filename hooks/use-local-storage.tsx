import { useEffect, useMemo, useState } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
  // ✅ Carica i dati dal localStorage SOLO una volta
  const storedValueMemo = useMemo(() => {
    try {
      if (typeof window === "undefined") return initialValue;
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("❌ Error reading from localStorage:", error);
      return initialValue;
    }
  }, [key]); // Dipende solo dalla chiave

  const [storedValue, setStoredValue] = useState<T>(storedValueMemo);

  // ✅ Sincronizza il localStorage solo se il valore è diverso
  const setValue = (value: T) => {
    try {
      if (JSON.stringify(storedValue) === JSON.stringify(value)) return; // 🔥 Evita aggiornamenti inutili

      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
      window.dispatchEvent(new Event("localStorageUpdated"));
    } catch (error) {
      console.error("❌ Error writing to localStorage:", error);
    }
  };

  const removeItem = () => {
    try {
      if (!window.localStorage.getItem(key)) return; // 🔥 Evita di rimuovere se non esiste

      setStoredValue(initialValue);
      window.localStorage.removeItem(key);
      window.dispatchEvent(new Event("localStorageUpdated"));
    } catch (error) {
      console.error("❌ Error removing from localStorage:", error);
    }
  };

  // ✅ Monitora `localStorage` e aggiorna lo stato automaticamente SOLO quando cambia
  useEffect(() => {
    const syncStorage = () => {
      try {
        const item = window.localStorage.getItem(key);
        setStoredValue(item ? JSON.parse(item) : initialValue);
      } catch (error) {
        console.error("❌ Error reading from localStorage:", error);
      }
    };

    window.addEventListener("localStorageUpdated", syncStorage);
    return () => window.removeEventListener("localStorageUpdated", syncStorage);
  }, [key, initialValue]);

  return [storedValue, setValue, removeItem] as const;
}

export default useLocalStorage;
