interface IProductPriceProps {
  price: number;
  percentageDiscount?: number;
  isSmall?: boolean;
}

const ProductPrice = ({
  price,
  percentageDiscount,
  isSmall = false,
}: IProductPriceProps) => {
  const discountedPrice = percentageDiscount
    ? (price - price * (percentageDiscount / 100)).toFixed(2)
    : price.toFixed(2);

  return (
    <div
      className={`flex flex-wrap items-center  ${isSmall ? "gap-1 text-sm" : "gap-2 text-base"}`}
    >
      {/* Prezzo scontato */}
      <span
        className={`font-bold text-indigo-600 dark:text-indigo-400 ${isSmall ? "text-base" : "text-2xl"}`}
      >
        € {discountedPrice}
      </span>

      {/* Prezzo originale */}
      {percentageDiscount ? (
        <span
          className={` text-gray-500 line-through ${isSmall ? "text-sm" : "text-base"}`}
        >
          € {price.toFixed(2)}
        </span>
      ) : null}

      {/* Sconto */}
      {percentageDiscount ? (
        <span
          className={`rounded bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600 dark:bg-red-900/20 dark:text-red-400 ${isSmall ? "text-[10px]" : "text-base"}`}
        >
          -{percentageDiscount}% {isSmall ? "" : "OFF"}
        </span>
      ) : null}
    </div>
  );
};

export default ProductPrice;
