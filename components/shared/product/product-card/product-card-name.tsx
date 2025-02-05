import { ROUTES } from "@/lib/constants/routes";
import Link from "next/link";

const ProductCardName = ({ slug, name }: { slug: string; name: string }) => {
  return (
    <Link href={ROUTES.PRODUCT(slug)} className="h-[60px] cursor-pointer">
      <h2 className="text-sm font-medium">{name}</h2>
    </Link>
  );
};

export default ProductCardName;
