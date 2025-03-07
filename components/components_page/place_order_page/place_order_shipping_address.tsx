import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const PlaceOrderShippingAddress = ({
  defaultAddress,
}: {
  defaultAddress: any;
}) => {
  return (
    <Card className="shadow-lg transition-all hover:shadow-xl md:col-span-2">
      <CardContent className="space-y-5 p-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          📍 Indirizzo di Spedizione
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          {defaultAddress.fullName}
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          {defaultAddress.street}, {defaultAddress.city},{" "}
          {defaultAddress.postalCode}, {defaultAddress.country}
        </p>
        <Link href="/shipping-address" className="mt-10">
          <button className="mt-10 flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none">
            Modifica Indirizzo
          </button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default PlaceOrderShippingAddress;
