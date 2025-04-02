"use client";
import { useLocalImage } from "@/hooks/use-local-image";
import { useLocale } from "next-intl";
import Image from "next/image";

const OffersType = ({ path }: { path: string }) => {
  const locale = useLocale();
  const imagePath = useLocalImage({ locale });
  return (
    <div>
      {imagePath && (
        <Image
          src={`${imagePath}${path}`}
          alt="product"
          width={1920}
          height={400}
          className="size-full object-cover object-center"
          priority
        />
      )}
    </div>
  );
};

export default OffersType;
