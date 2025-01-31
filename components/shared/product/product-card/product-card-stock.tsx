import ProductPrice from "../product-price";

export const ProductStock = ({
  stock,
  price,
}: {
  stock: number;
  price: string;
}) =>
  stock > 0 ? (
    <ProductPrice value={Number(price)} className="text-lg text-primary-500" />
  ) : (
    <p className="text-destructive">Out of stock</p>
  );
