"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const ProductImages = ({ images }: { images: string[] }) => {
  const [current, setCurrent] = React.useState(0);
  return (
    <div className="space-y-4">
      <Image
        src={images[current]}
        alt="product image" // TODO: Add alt text from BE (SEO)
        width={1000}
        height={1000}
        className="min-h[300px] object-cover object-center"
      />
      <div className="flex">
        {images.map((image, index) => (
          <div
            key={image}
            onClick={() => setCurrent(index)}
            className={cn(
              "cursor-pointer border mr-2 hover:border-primary-500",
              current === index && "border-primary-500"
            )}
          >
            <Image
              src={image}
              alt="product image" // TODO: Add alt text from BE (SEO)
              width={100}
              height={100}
              className="w-20 h-20 object-cover object-center"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
