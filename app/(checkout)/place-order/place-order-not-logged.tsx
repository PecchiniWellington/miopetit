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
import { formatCurrency } from "@/lib/utils";
import { Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// 📌 Mock dei dati per utenti non loggati
const mockCart = {
  items: [
    {
      id: "1",
      name: "Cibo per cani",
      slug: "cibo-per-cani",
      qty: 2,
      image: "/images/royal-canin-4.jpg",
      price: "14.99",
    },
    {
      id: "2",
      name: "Tiragraffi per gatti",
      slug: "tiragraffi",
      qty: 1,
      image: "/images/tiragraffi.jpg",
      price: "29.99",
    },
  ],
  itemsPrice: "59.97",
  taxPrice: "8.99",
  shippingPrice: "5.00",
  totalPrice: "73.96",
};

const mockUser = {
  defaultAddress: {
    fullName: "Mario Rossi",
    street: "Via Roma 10",
    city: "Milano",
    postalCode: "20121",
    country: "Italia",
  },
  paymentMethod: "Carta di Credito",
};

const PlaceOrderPageGuest = () => {
  return (
    <>
      {/* 📢 Banner Informativo */}
      <BannerInfo />

      <div className="mx-auto w-full space-y-8 py-10">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          🛒 Conferma il tuo ordine
        </h1>

        <div className="grid gap-6 md:grid-cols-3">
          {/* 🏠 Indirizzo di Spedizione */}
          <ShippingAddressCard address={mockUser.defaultAddress} />

          {/* 💳 Metodo di Pagamento */}
          <PaymentMethodCard paymentMethod={mockUser.paymentMethod} />

          {/* 🛍️ Articoli dell'ordine */}
          <OrderItemsTable items={mockCart.items} />

          {/* 📊 Riepilogo Ordine */}
          <OrderSummaryCard cart={mockCart} />
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
      Per offrirti un'esperienza di acquisto sicura e senza intoppi, i dettagli
      del tuo ordine verranno conservati per un massimo di{" "}
      <span className="font-bold">15 giorni</span> e poi eliminati
      automaticamente.
    </p>

    <p className="text-sm text-yellow-800 dark:text-yellow-300">
      Lo facciamo per garantire che la tua spedizione avvenga senza problemi e
      per proteggere i tuoi dati con la massima trasparenza.
    </p>

    {/* <div className="flex items-center justify-between">
      <Link
        href="/more-info"
        className="rounded-lg bg-yellow-500 px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-yellow-600 dark:bg-yellow-400 dark:hover:bg-yellow-500"
      >
        Scopri di più
      </Link>
    </div> */}
  </div>
);

// 📍 **Indirizzo di Spedizione**
const ShippingAddressCard = ({ address }: { address: any }) => (
  <Card className="shadow-lg transition-all hover:shadow-xl md:col-span-2">
    <CardContent className="space-y-5 p-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white">
        📍 Indirizzo di Spedizione
      </h2>
      <p className="text-lg text-gray-700 dark:text-gray-300">
        {address.fullName}
      </p>
      <p className="text-gray-600 dark:text-gray-400">
        {address.street}, {address.city}, {address.postalCode},{" "}
        {address.country}
      </p>
    </CardContent>
  </Card>
);

// 💳 **Metodo di Pagamento**
const PaymentMethodCard = ({ paymentMethod }: { paymentMethod: string }) => (
  <Card className="shadow-lg transition-all hover:shadow-xl">
    <CardContent className="flex flex-col items-stretch space-y-5 p-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white">
        💳 Metodo di Pagamento
      </h2>
      <p className="text-lg text-gray-700 dark:text-gray-300">
        {paymentMethod}
      </p>
    </CardContent>
  </Card>
);

// 🛍️ **Tabella degli Articoli**
const OrderItemsTable = ({ items }: { items: any[] }) => (
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
          {items.map((item) => (
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
              <TableCell className="text-center text-lg">{item.qty}</TableCell>
              <TableCell className="text-center text-lg">
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
const OrderSummaryCard = ({ cart }: { cart: any }) => (
  <Card className="shadow-lg transition-all hover:shadow-xl">
    <CardContent className="space-y-6 p-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white">
        📊 Riepilogo Ordine
      </h2>
      <SummaryRow label="Subtotale" value={cart.itemsPrice} />
      <SummaryRow label="IVA" value={cart.taxPrice} />
      <SummaryRow label="Spedizione" value={cart.shippingPrice} />
      <SummaryRow label="Totale" value={cart.totalPrice} isTotal />

      {/* Bottone per il login o registrazione */}
      <Link href="/sign-up">
        <button className="mt-6 w-full rounded-full bg-yellow-500 px-5 py-3 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-yellow-600">
          🔐 Accedi per Confermare l&apos;Ordine
        </button>
      </Link>
    </CardContent>
  </Card>
);

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
