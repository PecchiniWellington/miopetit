import Rating from "../rating";

const ProductCardStart = ({ rating }: { rating?: number | null }) => {
  return <Rating value={Number(rating)} />;
};

export default ProductCardStart;
