import { auth } from "@/auth";
import AnimalCategory from "@/components/components_page/root_page/animals-catergory";
import BestSellingProduct from "@/components/components_page/root_page/best-selling-products";
import DealCountdown from "@/components/components_page/root_page/deal-countdown";
import Gifts from "@/components/components_page/root_page/gifts";
import IconBoxes from "@/components/components_page/root_page/icons-boxes";
import OffersType from "@/components/components_page/root_page/offers-type";
import PresentationDeals from "@/components/components_page/root_page/presentation-deals";
import SpecialOfferBrand from "@/components/components_page/root_page/special-offer-brand";

import { getMyCart } from "@/core/actions/cart/cart.actions";
import { getLatestProducts } from "@/core/actions/products";
import { getProductsByCategoryKeywords } from "@/core/actions/products/get-product-by-category-keyword";
import { cache } from "react";

const fetchLatestProducts = cache(async () => getLatestProducts({ limit: 8 }));

export default async function Home() {
  const latestProducts = await fetchLatestProducts();
  const userLogged = await auth();
  let myCart = null;
  if (userLogged?.user?.id) {
    myCart = await getMyCart();
  }

  const [dogProduct, catProduct] = await Promise.all([
    getProductsByCategoryKeywords({ categoryKeywords: ["dog"], limit: 8 }),
    getProductsByCategoryKeywords({ categoryKeywords: ["cat"], limit: 8 }),
  ]);
  console.log("latestProducts", latestProducts);
  const data = latestProducts || [];
  const userId = userLogged?.user?.id;
  return (
    <>
      <PresentationDeals />

      <div className="mt-12">
        <AnimalCategory />
      </div>

      <div className="my-12">
        <IconBoxes />
      </div>

      <div className="mt-12">
        <OffersType path="bring-friend.png" />
      </div>

      <div className="mt-12">
        <SpecialOfferBrand data={data} userId={userId} myCart={myCart} />
      </div>

      <Gifts />
      <DealCountdown />
      <BestSellingProduct
        userId={userId}
        myCart={myCart}
        data={dogProduct}
        animalName="Dog"
      />
      <BestSellingProduct
        userId={userId}
        myCart={myCart}
        data={catProduct}
        animalName="Cat"
      />

      <div className="mt-12">
        <OffersType path="shipping-fast.png" />
      </div>
    </>
  );
}
