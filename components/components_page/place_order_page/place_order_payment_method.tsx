import BrandButton from "@/components/shared/brand-components/brand-button";
import BrandCard from "@/components/shared/brand-components/brand-card";
import { IUser } from "@/core/validators";
import { useTranslations } from "next-intl";
import Link from "next/link";

const PlaceOrderPaymentMethod = ({ user }: { user: IUser }) => {
  const t = useTranslations("Checkout.PlaceOrder");

  return (
    <BrandCard
      title={t("payment_method")}
      className="flex flex-col items-stretch space-y-5 p-6 shadow-lg transition-all hover:shadow-xl"
    >
      <p className="text-lg text-gray-700 dark:text-gray-300">
        {user.paymentMethod}
      </p>
      <Link href="/payment-method" className="mt-10">
        <BrandButton>{t("edit_payment_method")}</BrandButton>
      </Link>
    </BrandCard>
  );
};

export default PlaceOrderPaymentMethod;
