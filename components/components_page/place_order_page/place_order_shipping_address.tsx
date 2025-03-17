import BrandButton from "@/components/shared/brand-components/brand-button";
import BrandCard from "@/components/shared/brand-components/brand-card";
import { IAddress } from "@/core/validators/user-address.validator";
import { useTranslations } from "next-intl";
import Link from "next/link";

const PlaceOrderShippingAddress = ({
  defaultAddress,
}: {
  defaultAddress?: IAddress | null;
}) => {
  const t = useTranslations("Checkout.PlaceOrder");
  return defaultAddress ? (
    <BrandCard
      title={t("shipping_address")}
      className="p-6 shadow-lg transition-all hover:shadow-xl md:col-span-2"
    >
      <p className="text-lg text-gray-700 dark:text-gray-300">
        {defaultAddress.fullName}
      </p>
      <p className="text-gray-600 dark:text-gray-400">
        {defaultAddress.street}, {defaultAddress.city},{" "}
        {defaultAddress.postalCode}, {defaultAddress.country}
      </p>
      <BrandButton className="mt-8">
        <Link href="/shipping-address">{t("edit_address")}</Link>
      </BrandButton>
    </BrandCard>
  ) : null;
};

export default PlaceOrderShippingAddress;
