import { ROUTES } from "@/lib/constants/routes";
import Link from "next/link";

import React from "react";

const ProductCardName = ({ slug, name }: { slug: string; name: string }) => {
  return (
    <Link href={ROUTES.PRODUCT(slug)}>
      <h2 className="text-sm font-medium">{name}</h2>
    </Link>
  );
};

export default ProductCardName;
