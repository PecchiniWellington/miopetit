"use client";
import CheckoutSteps from "@/components/shared/checkout-steps";

import {
  FormField,
  FormItem,
  FormControl,
  Form,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { paymentMethodSchema } from "@/lib/validators";
import { updateUserPaymentMethod } from "@/lib/actions/user/user-payment-actions";
import {
  DEFAULT_PAYMENT_METHOD,
  PAYMENT_METHODS,
} from "@/lib/constants/payment-methods";
import DynamicButton from "@/components/dynamic-button";

const PaymentMethodForm = ({
  preferredPaymentMethod,
}: {
  preferredPaymentMethod?: string | null;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, setIsPending] = useTransition();

  const form = useForm<z.infer<typeof paymentMethodSchema>>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      type: preferredPaymentMethod || DEFAULT_PAYMENT_METHOD,
    },
  });

  const onSubmit = async (value: z.infer<typeof paymentMethodSchema>) => {
    setIsPending(async () => {
      const res = await updateUserPaymentMethod(value);
      if (!res.success) {
        toast({
          title: "destructive",
          description: res.message,
        });
        return;
      }

      router.push("/place-order");
    });
  };

  return (
    <>
      <CheckoutSteps current={2} />
      <div className="max-w-md mx-auto space-y-4">
        <h1 className="h2-bold mt-4">Payment Method</h1>
        <p className="text-sm text-muted-foreground">
          Please select a payment method
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            method="post"
            className="space-y-4"
          >
            <div className="flex flex-col md:flex-row gap-5">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <RadioGroup
                        defaultValue={field.value}
                        className="flex flex-col space-y-2"
                        onValueChange={field.onChange}
                      >
                        {PAYMENT_METHODS.map((paymentMethod) => (
                          <FormItem
                            key={paymentMethod}
                            className="flex items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem
                                value={paymentMethod}
                                checked={field.value === paymentMethod}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {paymentMethod}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex gap-2">
              <DynamicButton isPending={isPending}>
                {isPending ? (
                  <Loader className="animate-spin h-4 w-4" />
                ) : (
                  <ArrowRight className="h-4 w-4" />
                )}
                Continue
              </DynamicButton>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default PaymentMethodForm;
