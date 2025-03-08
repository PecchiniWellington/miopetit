import { Card, CardContent } from "@/components/ui/card";
import { IUser } from "@/core/validators";
import Link from "next/link";

const PlaceOrderPaymentMethod = ({ user }: { user: IUser }) => {
  return (
    <Card className="shadow-lg transition-all hover:shadow-xl">
      <CardContent className="flex flex-col items-stretch space-y-5 p-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          💳 Metodo di Pagamento
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          {user.paymentMethod}
        </p>
        <Link href="/payment-method" className="mt-10">
          <button className="mt-10 flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none">
            Modifica Metodo di Pagamento
          </button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default PlaceOrderPaymentMethod;
