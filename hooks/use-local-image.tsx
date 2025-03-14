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
  if (window.innerWidth < 768) return "mobile";
  /*  if (window.innerWidth < 1024) return "tablet"; */
  return "desktop";
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
  const [size, setSize] = useState(getDeviceSize());

  const [imagePath, setImagePath] = useState(
    getLocaleImagePath({ locale, subFolder, size: hasSize ? size : null })
  );

  useEffect(() => {
    const handleResize = () => {
      const newSize = getDeviceSize();
      if (newSize !== size && hasSize) {
        setSize(newSize);
        setImagePath(getLocaleImagePath({ locale, subFolder, size: newSize }));
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [locale, subFolder, size]);

  return imagePath;
};
