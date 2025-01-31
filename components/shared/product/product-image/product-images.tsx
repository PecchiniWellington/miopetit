"use client";
import React from "react";
import SingleImageInView from "./single-image-in-view";
import ProductGallery from "./product-gallery";

const ProductImages = ({ images }: { images: string[] }) => {
  const [current, setCurrent] = React.useState(0);
  return (
    <div className="space-y-4">
      <SingleImageInView image={images[current]} />
      <div className="flex">
        <ProductGallery
          images={images}
          current={current}
          setCurrent={setCurrent}
        />
      </div>
    </div>
  );
};

export default ProductImages;
