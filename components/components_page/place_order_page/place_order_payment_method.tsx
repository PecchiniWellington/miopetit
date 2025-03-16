import BrandButton from "@/components/shared/brand-components/brand-button";
import { Card, CardContent } from "@/components/ui/card";
import { IUser } from "@/core/validators";
import { useTranslations } from "next-intl";
import Link from "next/link";

const PlaceOrderPaymentMethod = ({ user }: { user: IUser }) => {
  const t = useTranslations("Checkout.PlaceOrder");

  return (
    <Card className="shadow-lg transition-all hover:shadow-xl">
      <CardContent className="flex flex-col items-stretch space-y-5 p-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          {t("payment_method")}
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          {user.paymentMethod}
        </p>
        <Link href="/payment-method" className="mt-10">
          <BrandButton>{t("edit_payment_method")}</BrandButton>
        </Link>
      </CardContent>
    </Card>
  );
};

export default PlaceOrderPaymentMethod;
