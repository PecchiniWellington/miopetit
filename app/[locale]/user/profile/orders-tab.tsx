import BrandBadge from "@/components/shared/brand-components/brand-badge";
import { getMyOrders } from "@/core/actions/order/order.action";
import { IOrder, IOrderItem } from "@/core/validators";
import { formatCurrency } from "@/lib/utils";
import { CheckCircle, Clock, Package, Truck } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const OrdersTab = () => {
  const [myOrders, setOrders] = useState<IOrder[]>([]);

  const fetchOrders = async () => {
    try {
      const { data } = (await getMyOrders({ page: 1 })) || [];
      setOrders(data);
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [toast]);

  const t = useTranslations("Profile.OrdersTab");

  if (myOrders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <Package className="size-10 text-gray-400" />
        <p className="mt-2 text-lg font-semibold text-gray-600">
          {t("no_orders.message")}
        </p>
        <Link
          href="/shop"
          className="mt-4 rounded-lg bg-indigo-600 px-5 py-2 text-white shadow-md transition hover:bg-indigo-700"
        >
          {t("no_orders.shop_button")}
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white  dark:bg-gray-800">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        {t("title")}
      </h2>

      <div className="mt-6 space-y-6">
        {myOrders.map((order) => (
          <div
            key={order.id}
            className="flex flex-col gap-4 rounded-lg border border-gray-300 bg-gray-50 p-5 shadow-sm transition hover:shadow-lg dark:border-gray-700 dark:bg-gray-900"
          >
            {/* 📌 Header - Info Principali */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t("order_card.order_number")}
                  {order.id.slice(-6).toUpperCase()}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* 🏷️ Stato dell'Ordine */}

              <BrandBadge
                variant={order.isDelivered ? "success" : "warning"}
                icon={
                  order.isDelivered ? (
                    <CheckCircle className="size-4" />
                  ) : order.isPaid ? (
                    <Truck className=" size-4" />
                  ) : (
                    <Clock className=" size-4" />
                  )
                }
                label={
                  order.isDelivered
                    ? t("order_card.status.shipped")
                    : order.isPaid
                      ? t("order_card.status.shipping")
                      : t("order_card.status.pending_payment")
                }
              />
            </div>

            {/* 📦 Dettagli Prodotti */}
            <div className="space-y-3">
              {order.orderitems.map((item: IOrderItem) => (
                <div key={item.productId} className="flex items-center gap-4">
                  <Image
                    height={50}
                    width={50}
                    src={item.image || "/images/placeholder.jpg"}
                    alt={item.name}
                    className="size-16 rounded-lg border shadow-sm"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t("order_card.items.quantity")}: {item.qty} |
                      {t("order_card.items.price")}:{formatCurrency(item.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* 💰 Riepilogo Prezzi */}
            <div className="flex flex-wrap justify-between border-t pt-4 text-gray-900 dark:text-white">
              <span> {t("order_card.total")}: </span>
              <span className="text-lg font-bold">
                {formatCurrency(order.totalPrice)}
              </span>
            </div>

            {/* 🔗 Pulsante per i dettagli */}
            <Link
              href={`/order/${order.id}`}
              className="mt-2 inline-block w-full rounded-lg bg-indigo-600 px-5 py-2 text-center text-white shadow-md transition hover:bg-indigo-700"
            >
              {t("order_card.details_button")}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
