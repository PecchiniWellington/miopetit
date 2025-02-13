import { useEffect, useState } from "react";

export default function useSticky(ref: React.RefObject<HTMLDivElement>) {
  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const { top } = ref.current.getBoundingClientRect();
      setSticky(top <= 0); // Attiva quando il top dell'elemento raggiunge il top della viewport
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [ref]);

  return isSticky;
}
