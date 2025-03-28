"use client";

import { IContributor } from "@/core/validators/contributors.validator";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import BrandButton from "../shared/brand-components/brand-button";

const BlockHero = ({ contributor }: { contributor: IContributor }) => {
  const [offsetY, setOffsetY] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current) {
        const scrollY = window.scrollY;
        setOffsetY(scrollY * 0.15); // Velocità parallax (puoi regolare 0.3 → più bassa = più lento)
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div
        ref={imageRef}
        className="relative h-[450px] w-full"
        style={{
          transform: `translateY(${offsetY}px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <Image
          src={contributor.coverImage || "/images/placeholder.jpg"}
          alt="Cover"
          fill
          className="scale-110 object-cover "
        />
      </div>

      {/* overlay + contenuto */}
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
        <Image
          src={contributor.logo || "/images/placeholder.jpg"}
          alt="Logo"
          width={90}
          height={90}
          className="mb-6 rounded-full border-4 border-white shadow-xl"
        />
        <h1 className="text-5xl font-bold text-white drop-shadow-lg">
          {contributor.name}
        </h1>
        <p className="mt-4 max-w-xl text-lg text-white/90">
          {contributor.description}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <BrandButton variant="primary">Visita lo shop</BrandButton>
          <BrandButton variant="tertiary">Contattaci</BrandButton>
        </div>
      </div>
    </section>
  );
};

export default BlockHero;
