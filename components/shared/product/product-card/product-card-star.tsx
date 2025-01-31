import React from "react";
import Rating from "../rating";

const ProductCardStart = ({ rating }: { rating: string }) => {
  return <Rating value={Number(rating)} />;
};

export default ProductCardStart;
