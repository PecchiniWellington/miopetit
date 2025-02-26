"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import CustomProduct from "../shared/product/customProduct";
import { IProduct } from "@/core/validators";

interface CarouselProps {
  data: IProduct[];
  itemsPerView?: number;
  gap?: number; // Gap tra le card in pixel
}

const ProductCarousel = ({
  data,
  itemsPerView = 3,
  gap = 16,
}: CarouselProps) => {
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

  // ✅ Avanza di 1 prodotto alla volta
  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + 1 >= totalItems - itemsToShow + 1 ? 0 : prev + 1
    );
  };

  // ✅ Torna indietro di 1 prodotto alla volta
  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev - 1 < 0 ? totalItems - itemsToShow : prev - 1
    );
  };

  // ✅ Inizio del touch (memorizza posizione)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  // ✅ Fine del touch (decide la direzione dello scroll)
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

  // ✅ Durante il touch (memorizza posizione finale)
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  return (
    <div
      className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-xl pb-12"
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
        {data.map((product, index) => (
          <div
            key={index}
            className="shrink-0"
            style={{
              flex: `0 0 calc(${100 / itemsToShow}% - ${gap}px)`,
            }}
          >
            <CustomProduct
              id={product.id}
              image={"/images/placeholder.jpg"}
              name={product.name}
              productBrand={"Senza Marca"}
              rating={5}
              reviews={0}
              availability="Disponibile"
              price={120}
              oldPrice={144}
              pricePerKg={"129"}
              product={product}
              slug={product.slug}
            />
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

export default ProductCarousel;
