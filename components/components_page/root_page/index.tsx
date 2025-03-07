import { ICart, IProduct } from "@/core/validators";
import Image from "next/image";
import AnimalCategory from "./animals-catergory";
import BestSellingProduct from "./best-selling-products";
import DealCountdown from "./deal-countdown";
import Gifts from "./gifts";
import IconBoxes from "./icons-boxes";
import PresentationDeals from "./presentation-deals";
import SpecialOfferBrand from "./special-offer-brand";

export const ConfigRootPage = ({
  userId,
  data,
  myCart,
}: {
  userId?: string;
  data: IProduct[];
  myCart: ICart | null;
}) => {
  return (
    <>
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
      <DealCountdown />
      <BestSellingProduct
        userId={userId}
        myCart={myCart}
        data={data}
        animalName="cane"
      />
      <BestSellingProduct
        userId={userId}
        myCart={myCart}
        data={data}
        animalName="gatto"
      />

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
    </>
  );
};
