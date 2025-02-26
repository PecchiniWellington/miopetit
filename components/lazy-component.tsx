"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

interface LazyLoadComponentProps {
  children: ReactNode;
  threshold?: number; // Percentuale visibile prima di caricare (0.1 = 10%)
  className?: string;
}

const LazyLoadComponent = ({
  children,
  threshold = 0.1,
  className = "",
}: LazyLoadComponentProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Interrompe l'osservazione dopo il primo trigger
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      {isVisible ? (
        children
      ) : (
        <p className="text-center text-gray-500">🕒 Caricamento...</p>
      )}
    </div>
  );
};

export default LazyLoadComponent;
