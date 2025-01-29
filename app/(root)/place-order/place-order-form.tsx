"use client";
import { Button } from "@/components/ui/button";
import { createOrder } from "@/lib/actions/order/order.action";
import { Check, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useFormStatus } from "react-dom";

const PlaceOrderForm = () => {
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await createOrder();
    if (res.redirectTo) router.push(res.redirectTo);
  };

  const PlaceOrderButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button
        type="submit"
        disabled={pending}
        className="primary-gradient min-h-[24px] !text-light-900 border-0.2 border-slate-300 w-full"
      >
        {pending ? (
          <Loader className="h-4 w-4 animate-spin" />
        ) : (
          <Check className="h-4 w-4 " />
        )}{" "}
        Place Order
      </Button>
    );
  };
  return (
    <form onSubmit={handleSubmit}>
      <PlaceOrderButton />
    </form>
  );
};

export default PlaceOrderForm;
