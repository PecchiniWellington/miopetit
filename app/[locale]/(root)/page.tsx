import { auth } from "@/auth";
import { ConfigRootPage } from "@/components/components_page/root_page";

import { getMyCart } from "@/core/actions/cart/cart.actions";
import { getLatestProducts } from "@/core/actions/products";
import { cache } from "react";

const fetchLatestProducts = cache(async () => getLatestProducts({ limit: 8 }));

export default async function Home() {
  const latestProducts = await fetchLatestProducts();
  const userLogged = await auth();
  let myCart = null;
  if (userLogged?.user?.id) {
    myCart = await getMyCart();
  }
  const userId = userLogged?.user?.id;
  return (
    <ConfigRootPage myCart={myCart} userId={userId} data={latestProducts} />
  );
}
