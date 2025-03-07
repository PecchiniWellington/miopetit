import { ConfigFavoritePage } from "@/components/components_page/favorite_page";

interface Product {
  id: number;
  image: string;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
}

const relatedProducts: Product[] = [
  {
    id: 3,
    image: "https://utfs.io/f/RnH9VIVP0zpxL8Sd59Kp86NzgPOkKSsma1BjXoZe9tA3HMCW",
    name: "Trainer Natural Medium Adult",
    brand: "Trainer",
    price: 44.99,
  },
  {
    id: 4,
    image: "https://utfs.io/f/RnH9VIVP0zpxL8Sd59Kp86NzgPOkKSsma1BjXoZe9tA3HMCW",
    name: "Farmina N&D Grain Free",
    brand: "Farmina",
    price: 59.99,
  },
];

export default function FavouritesPage() {
  return <ConfigFavoritePage relatedProducts={relatedProducts} />;
}
