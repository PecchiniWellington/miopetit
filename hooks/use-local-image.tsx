"use client";
import { useEffect, useState } from "react";

const getLocaleImagePath = ({
  locale,
  subFolder,
  size,
}: {
  locale: string;
  subFolder?: string;
  size: string | null;
}) => {
  return subFolder
    ? `/images/locales_images/${locale}/${subFolder}/${locale}-${size ? `${size}-` : ""}`
    : `/images/locales_images/${locale}/${size ? `${size}-` : ""}${locale}-`;
};

const getDeviceSize = () => {
  if (typeof window !== "undefined") {
    if (window.innerWidth < 768) return "mobile";
    return "desktop";
  }
  return "desktop"; // fallback lato server
};

export const useLocalImage = ({
  locale,
  subFolder,
  hasSize = true,
}: {
  locale: string;
  subFolder?: string;
  hasSize?: boolean;
}) => {
  const [size, setSize] = useState<"mobile" | "desktop" | null>(null);
  const [imagePath, setImagePath] = useState<string | null>(null);

  useEffect(() => {
    const initialSize = hasSize ? getDeviceSize() : null;
    setSize(initialSize);
    setImagePath(getLocaleImagePath({ locale, subFolder, size: initialSize }));

    const handleResize = () => {
      const newSize = getDeviceSize();
      if (newSize !== size && hasSize) {
        setSize(newSize);
        setImagePath(getLocaleImagePath({ locale, subFolder, size: newSize }));
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [locale, subFolder, hasSize]);

  return imagePath;
};
