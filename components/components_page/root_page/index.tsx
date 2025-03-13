import { ICart, IProduct } from "@/core/validators";
import { getLocaleImagePath } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
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
  const t = useTranslations();
  const locale = useLocale();
  const imagePath = locale ? getLocaleImagePath(locale) : "";

  return (
    <>
      <PresentationDeals />

      {/*  <div className="mt-12">
        <AnimalCategory />
      </div> */}

      <div className="my-12">
        <IconBoxes />
      </div>

      <div className="mt-12">
        <Image
          src={`${imagePath}test-lingua.png`}
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
          brandName="Royal Canin"
          image="/images/royalCanin-deal.webp"
          animalName={t("Shared.dog")}
        />
      </div>

      <Gifts />
      <DealCountdown />
      <BestSellingProduct
        userId={userId}
        myCart={myCart}
        data={data}
        animalName={t("Shared.dog")}
      />
      <BestSellingProduct
        userId={userId}
        myCart={myCart}
        data={data}
        animalName={t("Shared.cat")}
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
