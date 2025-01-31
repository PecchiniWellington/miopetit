"use client";
import DynamicButton from "@/components/dynamic-button";
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
      <DynamicButton isPending={pending}>
        {pending ? (
          <Loader className="h-4 w-4 animate-spin" />
        ) : (
          <Check className="h-4 w-4 " />
        )}{" "}
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

export default PlaceOrderForm;
