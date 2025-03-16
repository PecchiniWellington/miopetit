"use client";
import BrandButton from "@/components/shared/brand-components/brand-button";
import { createOrder } from "@/core/actions/order/order.action";
import useLocalStorage from "@/hooks/use-local-storage";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React from "react";
import { useFormStatus } from "react-dom";

const SubmitButtonOrder = () => {
  const router = useRouter();
  const [, setValue] = useLocalStorage("cart", []);
  const [, setCheckoutSteps] = useLocalStorage("completedCheckoutSteps", []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await createOrder();
    setValue([]);
    setCheckoutSteps([]);
    if (res.redirectTo) router.push(res.redirectTo);
  };
  const t = useTranslations("Checkout.PlaceOrder");

  const PlaceOrderButton = () => {
    const { pending } = useFormStatus();

    return (
      <BrandButton
        type="submit"
        loading={pending}
        variant="primary"
        icon={<Check className="size-4" />}
      >
        {t("place_order")}
      </BrandButton>
    );
  };
  return (
    <form onSubmit={handleSubmit}>
      <PlaceOrderButton />
    </form>
  );
};

export default SubmitButtonOrder;
