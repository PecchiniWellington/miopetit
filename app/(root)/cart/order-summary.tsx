import DynamicButton from "@/components/dynamic-button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { ArrowRight, Loader } from "lucide-react";

const OrderSummary = ({
  isPending,
  resume,
  goToCheckout,
}: {
  isPending: boolean;
  resume: any;
  goToCheckout: () => void;
}) => {
  return (
    <Card className="mt-10 rounded-lg border shadow-md md:mt-0">
      <CardContent className="gap-4 p-4">
        <h2 className="text-2xl font-semibold text-gray-800">Order Summary</h2>

        {/* Dettaglio dei prezzi */}
        <div className="space-y-2 text-gray-600">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-bold">
              {isPending ? (
                <Loader className="size-4 animate-spin" />
              ) : (
                formatCurrency(resume?.itemsPrice)
              )}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Discount</span>
            <span className="font-bold text-green-600">
              -{formatCurrency(10.0)} {/* Sconto Mockato */}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="font-bold">
              {formatCurrency(resume?.taxPrice)} {/* Spedizione Mockata */}
            </span>
          </div>

          <hr className="my-2" />

          {/* Totale Finale */}
          <div className="flex items-center justify-between text-xl font-semibold text-gray-800">
            <span>Total</span>
            <span>
              {isPending ? (
                <Loader className="size-4 animate-spin" />
              ) : (
                formatCurrency((Number(resume?.totalPrice) || 0) - 10.0 + 5.99)
              )}
            </span>
          </div>
        </div>

        <hr className="my-4" />

        {/* Subtotal Mockato */}
        <div className="flex items-center gap-2 pb-3 text-lg text-gray-700">
          Total Items:
          <span className=" font-semibold">
            {isPending ? (
              <Loader className="size-4 animate-spin" />
            ) : (
              resume.totalItems
            )}
          </span>
        </div>

        {/* Bottone di Checkout */}
        <DynamicButton
          className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none"
          handleAction={goToCheckout}
        >
          {isPending ? (
            <Loader className="size-4 animate-spin" />
          ) : (
            <ArrowRight className="size-4 " />
          )}
          Proceed to Checkout
        </DynamicButton>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
