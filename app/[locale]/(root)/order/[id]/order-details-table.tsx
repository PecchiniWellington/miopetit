"use client";

import { IOrder } from "@/core/validators";
import { formatId } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import OrderCard from "./order-card";
import PaymentCard from "./payment-card-component";
import ResumeItemsTable from "./resume-items-table";

const OrderDetailsTable = ({
  order,
  stripeClientSecret,
  paypalClientId,
  isAdmin,
}: {
  name?: string;
  order: IOrder;
  stripeClientSecret: string | null;
  paypalClientId: string;
  isAdmin: boolean;
}) => {
  const [isPaid, setIsPaid] = useState(order.isPaid);

  useEffect(() => {
    setIsPaid(order.isPaid);
  }, [order.isPaid]);

  const {
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    paidAt,
    isDelivered,
    deliveredAt,
    orderitems,
  } = order;

  const t = useTranslations("OrderConfirmation");
  return (
    <div className="mx-auto w-full space-y-6 px-4">
      {/* 🏷️ Titolo dell'ordine */}
      <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
        {t("order_number")}{" "}
        <span className="text-indigo-600">#{formatId(order.id)}</span>
      </h1>

      <div className="grid md:grid-cols-3 md:gap-6">
        {/* 📦 **Dettagli dell'ordine** */}
        <div className="col-span-2 space-y-6">
          {/* 💳 **Metodo di Pagamento** */}
          <OrderCard
            isPaid={isPaid}
            subtitle={paymentMethod}
            paidAt={paidAt}
            title={t("payment_method")}
            confirmedType={t("order_confirmation")}
            toConfirmType={t("to_pay")}
          />

          {/* 📍 **Indirizzo di Spedizione** */}
          <OrderCard
            isPaid={isDelivered}
            subtitle={shippingAddress.fullName}
            paidAt={deliveredAt}
            title={t("shipping_address")}
            confirmedType={t("order_delivered")}
            toConfirmType={t("to_deliver")}
          >
            <p className="text-gray-700 dark:text-gray-300">
              {shippingAddress.street}, {shippingAddress.city},{" "}
              {shippingAddress.postalCode}, {shippingAddress.country}
            </p>
          </OrderCard>

          {/* 🛍️ **Riepilogo degli Articoli** */}
          <OrderCard title={t("order_items")}>
            <ResumeItemsTable orderitems={orderitems} />
          </OrderCard>
        </div>

        {/* 💰 **Riepilogo del pagamento** */}
        <div className="col-span-2 md:col-span-1">
          <PaymentCard
            itemsPrice={itemsPrice}
            taxPrice={taxPrice}
            shippingPrice={shippingPrice}
            totalPrice={totalPrice}
            isPaid={isPaid}
            paymentMethod={paymentMethod}
            paypalClientId={paypalClientId}
            stripeClientSecret={stripeClientSecret}
            isAdmin={isAdmin}
            order={order}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsTable;
