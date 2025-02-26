"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface CarouselProps<T> {
  data: T[]; // Può essere un array di qualsiasi cosa (prodotti, immagini, articoli, ecc.)
  renderItem: (item: T, index: number) => JSX.Element; // Funzione per renderizzare gli elementi dinamicamente
  itemsPerView?: number; // Numero di elementi visibili
  gap?: number; // Spazio tra gli elementi
}

const DynamicCarousel = <T,>({
  data,
  renderItem,
  itemsPerView = 3,
  gap = 16,
}: CarouselProps<T>) => {
  const totalItems = data.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Controlla se siamo in mobile
  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const itemsToShow = isMobile ? 1 : itemsPerView;

  // ✅ Avanza di 1 elemento alla volta
  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + 1 >= totalItems - itemsToShow + 1 ? 0 : prev + 1
    );
  };

  // ✅ Torna indietro di 1 elemento alla volta
  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev - 1 < 0 ? totalItems - itemsToShow : prev - 1
    );
  };

  // ✅ Gestione swipe touch
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const deltaX = touchStartX.current - touchEndX.current;

    if (deltaX > 75) {
      nextSlide(); // Swipe sinistra → avanti
    } else if (deltaX < -75) {
      prevSlide(); // Swipe destra → indietro
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      className="relative mx-auto w-full overflow-hidden rounded-xl pb-12"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Contenuto del carosello */}
      <div
        className="flex w-full transition-transform duration-300 ease-in-out"
        style={{
          transform: `translateX(-${
            currentIndex * (100 / itemsToShow) + gap / itemsToShow
          }%)`,
          gap: `${gap}px`,
          marginLeft: `calc(${gap * itemsPerView}px )`,
        }}
      >
        {data.map((item, index) => (
          <div
            key={index}
            className="shrink-0"
            style={{
              flex: `0 0 calc(${100 / itemsToShow}% - ${gap}px)`,
            }}
          >
            {renderItem(item, index)}{" "}
            {/* 🔥 Usa la funzione passata per renderizzare qualsiasi componente */}
          </div>
        ))}
      </div>

      {/* Pulsanti di navigazione */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center rounded-full bg-black/50 p-3 text-white transition hover:bg-black/80"
      >
        <ChevronLeft size={32} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center rounded-full bg-black/50 p-3 text-white transition hover:bg-black/80"
      >
        <ChevronRight size={32} />
      </button>

      {/* Indicatori */}
      <div className="absolute inset-x-0 bottom-0 flex justify-center pb-4">
        <div className="flex gap-2 rounded-lg bg-white/80 p-2 shadow-md">
          {Array.from({
            length: totalItems - itemsToShow + 1,
          }).map((_, index) => (
            <span
              key={index}
              className={`size-3 rounded-full transition-all ${
                index === currentIndex ? "w-5 bg-black" : "w-3 bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DynamicCarousel;
