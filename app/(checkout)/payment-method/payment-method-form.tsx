"use client";
import DynamicButton from "@/components/dynamic-button";
import CheckoutSteps from "@/components/shared/checkout-steps";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { updateUserPaymentMethod } from "@/core/actions/user/user-payment-actions";
import { paymentMethodSchema } from "@/core/validators";
import { useToast } from "@/hooks/use-toast";
import {
  DEFAULT_PAYMENT_METHOD,
  PAYMENT_METHODS,
} from "@/lib/constants/payment-methods";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Banknote, Loader, Wallet } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { JSX, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Mappa delle icone/metodi di pagamento con immagini migliorate
const paymentIcons: Record<string, JSX.Element> = {
  Stripe: (
    <div className="flex items-center gap-3">
      <Image
        src="/assets/payment-methods/apple_pay.svg"
        alt="Apple Pay"
        width={40}
        height={24}
      />
      <Image
        src="/assets/payment-methods/google_pay.svg"
        alt="Google Pay"
        width={40}
        height={24}
      />
      <Image
        src="/assets/payment-methods/mc_pay.svg"
        alt="Mastercard"
        width={40}
        height={24}
      />
      <Image
        src="/assets/payment-methods/visa.svg"
        alt="Visa"
        width={40}
        height={24}
      />
    </div>
  ),
  PayPal: (
    <Image
      src="/assets/payment-methods/paypal_pay.svg"
      alt="PayPal"
      width={80}
      height={24}
    />
  ),
  "Bank Transfer": <Banknote className="size-6 text-green-500" />,
};

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
          title: "Errore",
          description: res.message,
          variant: "destructive",
        });
        return;
      }

      router.push("/place-order");
    });
  };

  return (
    <>
      <CheckoutSteps current={2} />
      <div className="mx-auto max-w-lg space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          🏦 Seleziona un metodo di pagamento
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Scegli il metodo con cui desideri completare il pagamento.
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            method="post"
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormControl>
                    <RadioGroup
                      defaultValue={field.value}
                      className="flex flex-col space-y-4"
                      onValueChange={field.onChange}
                    >
                      {PAYMENT_METHODS.map((paymentMethod) => (
                        <FormItem
                          key={paymentMethod}
                          className={`relative flex cursor-pointer items-center justify-between rounded-xl border p-5 shadow-sm transition-all duration-200 hover:shadow-md ${
                            field.value === paymentMethod
                              ? "border-blue-500 bg-blue-50 shadow-md dark:bg-blue-900"
                              : "border-gray-300 dark:border-gray-700"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <FormControl>
                              <RadioGroupItem
                                value={paymentMethod}
                                checked={field.value === paymentMethod}
                              />
                            </FormControl>
                            {paymentIcons[paymentMethod] || (
                              <Wallet className="size-6 text-gray-500" />
                            )}
                            <FormLabel className="text-lg font-medium text-gray-800 dark:text-white">
                              {paymentMethod}
                            </FormLabel>
                          </div>
                          {field.value === paymentMethod && (
                            <div className="absolute right-2 top-2">
                              <span className="inline-block size-4 rounded-full bg-blue-500"></span>
                            </div>
                          )}
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex w-full items-center justify-center">
              <DynamicButton
                handleAction={() => router.push("/place-order")}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none"
              >
                {isPending ? (
                  <Loader className="size-5 animate-spin" />
                ) : (
                  <ArrowRight className="size-5" />
                )}
                Procedi al pagamento
              </DynamicButton>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default PaymentMethodForm;
