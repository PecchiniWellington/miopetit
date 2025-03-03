import { auth } from "@/auth";
import AnimalCategory from "@/components/animals-catergory";
import BestSellingProduct from "@/components/best-selling-products";
import Gifts from "@/components/gifts";
import IconBoxes from "@/components/icons-boxes";
import PresentationDeals from "@/components/presentation-deals";
import SpecialOfferBrand from "@/components/special-offer-brand";
import { getMyCart } from "@/core/actions/cart/cart.actions";
import { getLatestProducts } from "@/core/actions/products";
import Image from "next/image";
import { cache } from "react";

const fetchLatestProducts = cache(async () => getLatestProducts({ limit: 8 }));

export default async function Home() {
  const latestProducts = await fetchLatestProducts();
  const myCart = await getMyCart();
  const userLogged = await auth();
  const userId = userLogged?.user?.id;
  console.log("🔍 [DEBUG] - userId:", userId);

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

  return (
    <div>
      {/* ✅ Usiamo Suspense per evitare rendering multipli */}
      {/*  <Suspense fallback={<div>Caricamento prodotti...</div>}>
        {featuredProducts.length > 0 && (
          <ProductCarousel data={featuredProducts} />
        )}
      </Suspense> */}

      <PresentationDeals />

      <div className="mt-2">
        <AnimalCategory />
      </div>

      <div className="my-12">
        <IconBoxes />
      </div>

      <div className="mt-12">
        <Image
          src="/images/porta-un-amico.png"
          alt="product"
          width={1920}
          height={400}
          className="size-full object-cover object-center"
          priority
        />
      </div>

      <div className="mt-12">
        <SpecialOfferBrand
          data={data}
          userId={userId}
          myCart={myCart}
          title="Offerta Royal Canin"
        />
      </div>

      <Gifts />
      <BestSellingProduct
        userId={userId}
        myCart={myCart}
        data={latestProducts}
        animalName="cane"
      />
      {/*  <BestSellingProduct
        userId={userId}
        myCart={myCart}
        latestProducts={latestProducts}
        animalName="gatto"
      /> */}

      <div className="mt-12">
        <Image
          src="/images/Modo-semplice-per-spedire.png"
          alt="product"
          width={1920}
          height={400}
          className="size-full object-cover object-center"
          priority
        />
      </div>
    </div>
  );
}
