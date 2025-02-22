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
import useLocalStorage from "@/hooks/use-local-storage";
import {
  DEFAULT_PAYMENT_METHOD,
  PAYMENT_METHODS,
} from "@/lib/constants/payment-methods";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  Banknote,
  Info,
  Loader,
  Wallet,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { JSX, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Mappa delle icone/metodi di pagamento
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
  user,
}: {
  preferredPaymentMethod?: string | null;
  user?: any;
}) => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [showBanner, setShowBanner] = useState(!user);
  const [, setValue] = useLocalStorage(
    "preferredPaymentMethod",
    preferredPaymentMethod
  );

  const form = useForm<z.infer<typeof paymentMethodSchema>>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      type: preferredPaymentMethod || DEFAULT_PAYMENT_METHOD,
    },
  });

  const onSubmit = async (value: z.infer<typeof paymentMethodSchema>) => {
    try {
      setIsPending(true);

      if (user) {
        const res = await updateUserPaymentMethod(value);
        setIsPending(false);

        if (!res.success) {
          alert("Errore: " + res.message);
          return;
        }
      } else {
        setIsPending(false);
      }
      setValue(value);
      setIsPending(false);
      router.push("/place-order");
    } catch (error) {
      setIsPending(false);
      console.log("Errore nell'aggiornamento del metodo di pagamento", error);
    }
  };

  return (
    <>
      <CheckoutSteps current={2} />

      {/* 🔔 Banner per utenti non loggati */}
      {showBanner && !preferredPaymentMethod && (
        <div className="relative mx-auto max-w-2xl rounded-lg border border-yellow-400 bg-gradient-to-r from-yellow-500 to-orange-600 p-5 shadow-lg">
          <div className="flex items-center gap-3 text-white">
            <Info className="size-8 animate-bounce" />
            <div>
              <p className="text-lg font-semibold">
                Indirizzo Salvato Temporaneamente 🕒
              </p>
              <p className="text-md mt-1">
                Il tuo indirizzo verrà salvato per un massimo di{" "}
                <span className="font-bold">15 giorni</span> e poi sarà
                cancellato automaticamente.
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-col items-center">
            {/* Bottone principale per salvare l'indirizzo */}
            <Link
              href="/sign-up"
              className="w-full rounded-full bg-white px-3 py-2 text-center text-sm font-semibold text-yellow-700 shadow-md transition-all duration-300 hover:scale-105 hover:bg-yellow-100 sm:px-5 sm:py-3 sm:text-lg"
            >
              🔒 Salva il tuo Indirizzo Permanentemente!
            </Link>

            {/* Link secondario per più informazioni */}
          </div>

          {/* Pulsante per chiudere il banner */}
          <button
            onClick={() => setShowBanner(false)}
            className="absolute right-3 top-3 text-white hover:text-gray-200"
          >
            <XCircle className="size-6" />
          </button>
        </div>
      )}

      <div className="mx-auto mt-10 max-w-lg space-y-6 md:mt-0">
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
                            <span className="absolute right-2 top-2 size-4 rounded-full bg-blue-500"></span>
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
