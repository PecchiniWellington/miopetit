import { ResumeCard } from "@/app/[locale]/(root)/order/[id]/payment-card-component/resume-card";
import { ICart } from "@/core/validators/cart.validator"; // Assuming a specific cart validator exists
import { IAddress } from "@/core/validators/user-address.validator";
import { IUser } from "@/core/validators/user.validator"; // Assuming a specific user validator exists
import { useTranslations } from "next-intl";
import { redirect } from "next/navigation";
import PlaceOrderPaymentMethod from "./place_order_payment_method";
import PlaceOrderShippingAddress from "./place_order_shipping_address";
import PlaceOrderTableResume from "./place_order_table_resume";

const ConfigPlaceOrderPage = ({
  defaultAddress,
  user,
  myCart,
}: {
  defaultAddress: IAddress | null;
  user: IUser | null;
  myCart: ICart | null;
}) => {
  console.log("🚀 ConfigPlaceOrderPage", { user });
  if (!myCart || myCart.items.length === 0) redirect("/cart");
  if (!user?.defaultAddress) redirect("/shipping-address");
  if (!user?.paymentMethod) redirect("/payment-method");

  const t = useTranslations("Checkout.PlaceOrder");
  return (
    <div className="mx-auto w-full space-y-8 px-6 py-10">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
        {t("title")}
      </h1>

      <div className="grid gap-6 md:grid-cols-3">
        {/* 🏠 Indirizzo di Spedizione */}
        <PlaceOrderShippingAddress defaultAddress={defaultAddress} />

        {/* 💳 Metodo di Pagamento */}
        <PlaceOrderPaymentMethod user={user} />

        {/* 🛍️ Articoli dell'ordine */}
        <PlaceOrderTableResume myCart={myCart} />

        {/* 📊 Riepilogo Ordine */}
        <ResumeCard
          itemsPrice={myCart.itemsPrice}
          shippingPrice={myCart.shippingPrice}
          taxPrice={myCart.taxPrice}
          totalPrice={myCart.totalPrice}
        />
      </div>
    </div>
  );
};

export default ConfigPlaceOrderPage;
