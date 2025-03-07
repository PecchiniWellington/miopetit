import { cn } from "@/lib/utils";

interface IProductPriceProps {
  value: number;
  className?: string;
}

const ProductPrice = ({ value, className }: IProductPriceProps) => {
  const stringValue = value.toFixed(2);
  const [intValue, floatValue] = stringValue.split(".");
  return (
    <p className={cn("text-2xl", className)}>
      <span className="align-super text-xs">€</span>
      {intValue}
      <span className="align-super text-xs">.{floatValue}</span>
    </p>
  );
};

export default ProductPrice;
