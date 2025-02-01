import { CardHeader } from "@/components/ui/card";

import Image from "next/image";
import Link from "next/link";

export const ProductCardHeader = ({
  slug,
  images,
  name,
}: {
  slug: string;
  images: string[];
  name: string;
}) => (
  <CardHeader className="p-0 items-center">
    <Link href={`/product/${slug}`}>
      <Image
        src={images[0] || "/images/placeholder.jpg"}
        alt={name}
        height={300}
        width={300}
        priority={true}
        className="h-[300px] object-contain p-4"
      />
    </Link>
  </CardHeader>
);
