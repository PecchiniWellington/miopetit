import { auth } from "@/auth";
import { ConfigRootPage } from "@/components/components_page/root_page";

import { getMyCart } from "@/core/actions/cart/cart.actions";
import { getLatestProducts } from "@/core/actions/products";
import { cache } from "react";

const fetchLatestProducts = cache(async () => getLatestProducts({ limit: 8 }));

export default async function Home() {
  const fetchProductWithDelay = async (fetchFunction: () => Promise<any>) => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Ritardo di 5 secondi
    return fetchFunction();
  };

  const latestProducts = await fetchProductWithDelay(fetchLatestProducts);
  const myCart = await fetchProductWithDelay(getMyCart);
  const userLogged = await fetchProductWithDelay(auth);
  const userId = userLogged?.user?.id;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = latestProducts.map((product: any) => ({
    ...product,
    image: ["/images/royal-canin-4.jpg"],
    description: product.description ?? "",
    stock: product.stock ?? null,
    animalAge: product.animalAge ?? "",
    categoryType: product.categoryType ?? "",
    productProteinsId: product.productProteinsId ?? [],
  }));

  return <ConfigRootPage myCart={myCart} userId={userId} data={data} />;
}
