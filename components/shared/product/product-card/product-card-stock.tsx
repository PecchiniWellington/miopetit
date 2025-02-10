import ProductPrice from "../product-price";

export const ProductStock = ({
  stock,
  price,
}: {
  stock: number | null;
  price: string;
}) =>
  stock && stock > 0 ? (
    <ProductPrice
      value={Number(price)}
      className="text-lg font-bold text-primary-500"
    />
  ) : (
    <p>Out of stock</p>
  );
