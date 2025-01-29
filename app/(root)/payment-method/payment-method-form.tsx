"use client";
import CheckoutSteps from "@/components/shared/checkout-steps";

import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormControl,
  Form,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { DEFAULT_PAYMENT_METHOD, PAYMENT_METHODS } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { updateUserPaymentMethod } from "@/lib/actions/user.action";
import { paymentMethodSchema } from "@/lib/validators";

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
    console.log("RES", value);

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
              <Button
                type="submit"
                disabled={isPending}
                className="primary-gradient min-h-[24px] !text-light-900 border-0.2 border-slate-300"
              >
                {isPending ? (
                  <Loader className="animate-spin h-4 w-4" />
                ) : (
                  <ArrowRight className="h-4 w-4" />
                )}
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default PaymentMethodForm;
