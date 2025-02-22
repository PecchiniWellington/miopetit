"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ICartItem } from "@/core/validators";
import useLocalStorage from "@/hooks/use-local-storage";
import { formatCurrency, round2 } from "@/lib/utils";
import { Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SubmitButtonOrder from "./submit-button-order";

// 📌 Calcola prezzi
const calcPrice = (items: ICartItem[]) => {
  const itemsPrice = items?.reduce(
    (acc, item) => acc + Number(item.price) * item.qty,
    0
  );

  const shippingPrice = round2(itemsPrice > 100 ? 0 : 10);
  const taxPrice = round2(0.15 * itemsPrice);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  return {
    itemsPrice: itemsPrice?.toFixed(2),
    shippingPrice: shippingPrice?.toFixed(2),
    taxPrice: taxPrice?.toFixed(2),
    totalPrice: totalPrice?.toFixed(2),
  };
};

const PlaceOrderPageGuest = () => {
  const [storedAddresses] = useLocalStorage("addresses", []);
  const [storedCart] = useLocalStorage("cart", []);
  const [preferredPaymentMethod] = useLocalStorage(
    "preferredPaymentMethod",
    {}
  );

  return (
    <>
      <BannerInfo />

      <div
        className="mx-auto w-full space-y-8 
       py-10 sm:px-6 lg:px-8"
      >
        <h1 className="text-center text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl">
          🛒 Conferma il tuo ordine
        </h1>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          <ShippingAddressCard address={storedAddresses[0]} />
          <PaymentMethodCard paymentMethod={preferredPaymentMethod.type} />
          <OrderItemsTable items={storedCart} />
          <OrderSummaryCard items={storedCart} />
        </div>
      </div>
    </>
  );
};

export default PlaceOrderPageGuest;

// 📢 **Banner Informativo**
const BannerInfo = () => (
  <div className="flex flex-col gap-4 rounded-lg border-l-4 border-yellow-500 bg-yellow-100 px-6 py-5 shadow-md dark:border-yellow-400 dark:bg-yellow-900">
    <div className="flex items-center gap-4">
      <Info className="size-8 text-yellow-700 dark:text-yellow-300" />
      <p className="text-lg font-semibold text-yellow-800 dark:text-yellow-300">
        I tuoi dati verranno salvati temporaneamente! ⏳
      </p>
    </div>
    <p className="text-md text-yellow-700 dark:text-yellow-200">
      Per offrirti un'esperienza di acquisto sicura, i dettagli del tuo ordine
      verranno conservati per <span className="font-bold">15 giorni</span> e poi
      eliminati automaticamente.
    </p>
  </div>
);

// 📍 **Indirizzo di Spedizione**
const ShippingAddressCard = ({ address }: { address: any }) => (
  <Card className="shadow-lg transition-all hover:shadow-xl md:col-span-2">
    <CardContent className="space-y-5 p-6">
      <h2 className="text-lg font-bold text-gray-800 dark:text-white sm:text-xl">
        📍 Indirizzo di Spedizione
      </h2>
      <p className="text-gray-700 dark:text-gray-300">{address?.fullName}</p>
      <p className="text-gray-600 dark:text-gray-400">
        {address?.street}, {address?.city}, {address?.postalCode},{" "}
        {address?.country}
      </p>
    </CardContent>
  </Card>
);

// 💳 **Metodo di Pagamento**
const PaymentMethodCard = ({ paymentMethod }: { paymentMethod: string }) => (
  <Card className="shadow-lg transition-all hover:shadow-xl">
    <CardContent className="space-y-5 p-6">
      <h2 className="text-lg font-bold text-gray-800 dark:text-white sm:text-xl">
        💳 Metodo di Pagamento
      </h2>
      <p className="text-gray-700 dark:text-gray-300">{paymentMethod}</p>
    </CardContent>
  </Card>
);

// 🛍️ **Tabella degli Articoli**
const OrderItemsTable = ({ items }: { items: any[] }) => (
  <Card className="shadow-lg transition-all hover:shadow-xl md:col-span-2">
    <CardContent className="space-y-5 overflow-x-auto p-6">
      <h2 className="text-lg font-bold text-gray-800 dark:text-white sm:text-xl">
        🛍️ Articoli nel tuo ordine
      </h2>
      <Table className="min-w-full">
        <TableHeader>
          <TableRow className="bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white">
            <TableHead>Prodotto</TableHead>
            <TableHead className="text-center">Quantità</TableHead>
            <TableHead className="text-center">Prezzo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items?.map((item) => (
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
                    width={50}
                    height={50}
                    className="rounded-lg border shadow-sm"
                  />
                  <span className="text-sm font-medium sm:text-base">
                    {item.name}
                  </span>
                </Link>
              </TableCell>
              <TableCell className="text-center text-sm sm:text-lg">
                {item.qty}
              </TableCell>
              <TableCell className="text-center text-sm sm:text-lg">
                {formatCurrency(item.price)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

// 📊 **Riepilogo dell'Ordine**
const OrderSummaryCard = ({ items }: { items: any[] }) => {
  const cart = calcPrice(items);
  return (
    <Card className="shadow-lg transition-all hover:shadow-xl">
      <CardContent className="space-y-6 p-6">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white sm:text-xl">
          📊 Riepilogo Ordine
        </h2>
        <SummaryRow label="Subtotale" value={cart.itemsPrice} />
        <SummaryRow label="IVA" value={cart.taxPrice} />
        <SummaryRow label="Spedizione" value={cart.shippingPrice} />
        <SummaryRow label="Totale" value={cart.totalPrice} isTotal />
        <SubmitButtonOrder />
      </CardContent>
    </Card>
  );
};

// 🧾 **Riga del Riepilogo**
const SummaryRow = ({
  label,
  value,
  isTotal = false,
}: {
  label: string;
  value: string;
  isTotal?: boolean;
}) => (
  <div
    className={`flex justify-between text-lg ${isTotal ? "border-t pt-4 text-2xl font-bold text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300"}`}
  >
    <span>{label}</span>
    <span>{formatCurrency(value)}</span>
  </div>
);
