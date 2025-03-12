import SubmitButtonOrder from "@/components/components_page/place_order_page/submit-button-order";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { useTranslations } from "next-intl";

export const ResumeCard = ({
  itemsPrice,
  taxPrice,
  shippingPrice,
  totalPrice,
  showPlaceOrder = true,
}: {
  itemsPrice: string;
  taxPrice: string;
  shippingPrice: string;
  totalPrice: string;
  showPlaceOrder?: boolean;
}) => {
  const t = useTranslations("Checkout.PlaceOrder");
  return (
    <Card className="shadow-lg transition-all hover:shadow-xl">
      <CardContent className="space-y-6 p-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          {t("order_summary")}
        </h2>
        <div className="flex justify-between text-lg text-gray-700 dark:text-gray-300">
          <span>{t("subtotal")}</span>
          <span>{formatCurrency(itemsPrice as unknown as string)}</span>
        </div>
        <div className="flex justify-between text-lg text-gray-700 dark:text-gray-300">
          <span>{t("tax")}</span>
          <span>{formatCurrency(taxPrice as unknown as string)}</span>
        </div>
        <div className="flex justify-between text-lg text-gray-700 dark:text-gray-300">
          <span>{t("shipping")}</span>
          <span>{formatCurrency(shippingPrice as unknown as string)}</span>
        </div>
        <div className="flex justify-between border-t pt-4 text-2xl font-bold text-gray-900 dark:text-white">
          <span>{t("total")}</span>
          <span>{formatCurrency(totalPrice as unknown as string)}</span>
        </div>
        {showPlaceOrder && <SubmitButtonOrder />}
      </CardContent>
    </Card>
  );
};
