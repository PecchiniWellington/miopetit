import { IBrand } from "@/types";

const ProductCardBrand = ({
  productBrand,
}: {
  productBrand?: IBrand | null;
}) => {
  return <h2 className="text-base font-bold">{productBrand?.name}</h2>;
};

export default ProductCardBrand;
