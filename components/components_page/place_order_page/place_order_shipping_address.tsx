import BrandButton from "@/components/shared/brand-components/brand-button";
import { Card, CardContent } from "@/components/ui/card";
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
    <Card className="shadow-lg transition-all hover:shadow-xl md:col-span-2">
      <CardContent className="space-y-5 p-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          {t("shipping_address")}
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          {defaultAddress.fullName}
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          {defaultAddress.street}, {defaultAddress.city},{" "}
          {defaultAddress.postalCode}, {defaultAddress.country}
        </p>
        <BrandButton>
          <Link href="/shipping-address" className="mt-8">
            {t("edit_address")}
          </Link>
        </BrandButton>
      </CardContent>
    </Card>
  ) : null;
};

export default PlaceOrderShippingAddress;
