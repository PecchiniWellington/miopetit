import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import SubmitButtonOrder from "./submit-button-order";

const PlaceOrderLogged = ({
  defaultAddress,
  user,
  cart,
}: {
  defaultAddress: {
    fullName: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  user: any;
  cart: any;
}) => {
  if (!cart || cart.items.length === 0) redirect("/cart");
  if (!user?.defaultAddress) redirect("/shipping-address");
  if (!user?.paymentMethod) redirect("/payment-method");
  return (
    <div className="mx-auto w-full space-y-8 px-6 py-10">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
        🛒 Conferma il tuo ordine
      </h1>

      <div className="grid gap-6 md:grid-cols-3">
        {/* 🏠 Indirizzo di Spedizione */}
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

        {/* 💳 Metodo di Pagamento */}
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

        {/* 🛍️ Articoli dell'ordine */}
        <Card className="shadow-lg transition-all hover:shadow-xl md:col-span-2">
          <CardContent className="space-y-5 p-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              🛍️ Articoli nel tuo ordine
            </h2>
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white">
                  <TableHead>Prodotto</TableHead>
                  <TableHead className="text-center">Quantità</TableHead>
                  <TableHead className="text-center">Prezzo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart?.items.map((item) => (
                  <TableRow
                    key={item.slug}
                    className="transition hover:bg-gray-50 dark:hover:bg-gray-900"
                  >
                    <TableCell>
                      <Link
                        href={`/product/${item.slug}`}
                        className="flex items-center gap-4"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={60}
                          height={60}
                          className="rounded-lg border shadow-sm"
                        />
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    </TableCell>
                    <TableCell className="text-center text-lg">
                      {item.qty}
                    </TableCell>
                    <TableCell className="text-center text-lg">
                      {formatCurrency(item?.price)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* 📊 Riepilogo Ordine */}
        <Card className="shadow-lg transition-all hover:shadow-xl">
          <CardContent className="space-y-6 p-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              📊 Riepilogo Ordine
            </h2>
            <div className="flex justify-between text-lg text-gray-700 dark:text-gray-300">
              <span>Subtotale</span>
              <span>
                {formatCurrency(cart?.itemsPrice as unknown as string)}
              </span>
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
              <span>
                {formatCurrency(cart?.totalPrice as unknown as string)}
              </span>
            </div>
            <SubmitButtonOrder />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PlaceOrderLogged;
