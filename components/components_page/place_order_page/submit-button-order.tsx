"use client";
import DynamicButton from "@/components/dynamic-button";
import { createOrder } from "@/core/actions/order/order.action";
import useLocalStorage from "@/hooks/use-local-storage";
import { Check, Loader } from "lucide-react";
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

  const PlaceOrderButton = () => {
    const { pending } = useFormStatus();
    return (
      <DynamicButton className="mt-10 flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none">
        {pending ? (
          <Loader className="size-4 animate-spin" />
        ) : (
          <Check className="size-4 " />
        )}
        Place Order
      </DynamicButton>
    );
  };
  return (
    <form onSubmit={handleSubmit}>
      <PlaceOrderButton />
    </form>
  );
};

export default SubmitButtonOrder;
