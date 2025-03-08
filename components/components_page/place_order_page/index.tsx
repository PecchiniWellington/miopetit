import { ICart, IUser } from "@/core/validators";
import { IAddress } from "@/core/validators/user-address.validator";
import { redirect } from "next/navigation";
import PlaceOrderPaymentMethod from "./place_order_payment_method";
import PlaceOrderResume from "./place_order_resume";
import PlaceOrderShippingAddress from "./place_order_shipping_address";
import PlaceOrderTableResume from "./place_order_table_resume";

const ConfigPlaceOrderPage = ({
  defaultAddress,
  user,
  myCart,
}: {
  defaultAddress?: IAddress | null;
  user: IUser | null;
  myCart: ICart | null;
}) => {
  if (!myCart || myCart.items.length === 0) redirect("/cart");
  if (!user?.defaultAddress) redirect("/shipping-address");
  if (!user?.paymentMethod) redirect("/payment-method");
  return (
    <div className="mx-auto w-full space-y-8 px-6 py-10">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
        🛒 Conferma il tuo ordine
      </h1>

      <div className="grid gap-6 md:grid-cols-3">
        {/* 🏠 Indirizzo di Spedizione */}
        <PlaceOrderShippingAddress defaultAddress={defaultAddress} />

        {/* 💳 Metodo di Pagamento */}
        <PlaceOrderPaymentMethod user={user} />

        {/* 🛍️ Articoli dell'ordine */}
        <PlaceOrderTableResume myCart={myCart} />

        {/* 📊 Riepilogo Ordine */}
        <PlaceOrderResume myCart={myCart} />
      </div>
    </div>
  );
};

export default ConfigPlaceOrderPage;
