import Rating from "../rating";

const ProductCardStart = ({ rating }: { rating: string | null }) => {
  return <Rating value={Number(rating)} />;
};

export default ProductCardStart;
