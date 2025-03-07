import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import SubmitButtonOrder from "./submit-button-order";

const PlaceOrderResume = ({ cart }: { cart: any }) => {
  return (
    <Card className="shadow-lg transition-all hover:shadow-xl">
      <CardContent className="space-y-6 p-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          📊 Riepilogo Ordine
        </h2>
        <div className="flex justify-between text-lg text-gray-700 dark:text-gray-300">
          <span>Subtotale</span>
          <span>{formatCurrency(cart?.itemsPrice as unknown as string)}</span>
        </div>
        <div className="flex justify-between text-lg text-gray-700 dark:text-gray-300">
          <span>IVA</span>
          <span>{formatCurrency(cart?.taxPrice as unknown as string)}</span>
        </div>
        <div className="flex justify-between text-lg text-gray-700 dark:text-gray-300">
          <span>Spedizione</span>
          <span>
            {formatCurrency(cart?.shippingPrice as unknown as string)}
          </span>
        </div>
        <div className="flex justify-between border-t pt-4 text-2xl font-bold text-gray-900 dark:text-white">
          <span>Totale</span>
          <span>{formatCurrency(cart?.totalPrice as unknown as string)}</span>
        </div>
        <SubmitButtonOrder />
      </CardContent>
    </Card>
  );
};

export default PlaceOrderResume;
