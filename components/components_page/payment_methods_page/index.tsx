"use client";
import ApplePay from "@/components/icons/ApplePay";
import GooglePay from "@/components/icons/GooglePay";
import McPay from "@/components/icons/McPay";
import PayPalIcon from "@/components/icons/PayPalIcon";
import VisaPay from "@/components/icons/VisaPay";
import BrandButton from "@/components/shared/brand-components/brand-button";
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
import { ArrowRight, Banknote, Wallet } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { JSX, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const paymentIcons: Record<string, JSX.Element> = {
  Stripe: (
    <div className="flex items-center gap-4 rounded-2xl ">
      <ApplePay className="h-9 w-14 rounded-xl bg-white p-2 text-gray-700 shadow-lg transition-colors duration-200 hover:text-black " />
      <GooglePay className="h-9 w-14 rounded-xl bg-white p-2 text-gray-700 shadow-lg transition-colors duration-200 hover:text-black " />
      <McPay className="h-9 w-14 rounded-xl bg-white text-gray-700 shadow-lg transition-colors duration-200 hover:text-black" />
      <VisaPay className="h-9 w-14 rounded-xl bg-white text-gray-700 shadow-lg transition-colors duration-200 hover:text-black" />
    </div>
  ),
  PayPal: (
    <PayPalIcon className="h-14 w-24 rounded-xl bg-white text-gray-700 shadow-lg transition-colors duration-200 hover:text-black" />
  ),
  "Bank Transfer": <Banknote className="size-6 text-green-500" />,
};

const ConfigPaymentMethodsPage = ({
  preferredPaymentMethod,
  userId,
}: {
  preferredPaymentMethod?: string | null;
  userId?: string;
}) => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
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

      if (userId) {
        const res = await updateUserPaymentMethod(value);
        setIsPending(false);

        if (!res.success) {
          alert("Errore: " + res.message);
          return;
        }
      } else {
        setIsPending(false);
      }
      setValue(value.type);
      setIsPending(false);
      router.push("/place-order");
    } catch (error) {
      setIsPending(false);
      console.log("Errore nell'aggiornamento del metodo di pagamento", error);
    }
  };

  const t = useTranslations("Checkout.payment_method");

  return (
    <div className="mx-auto mt-10 max-w-lg space-y-6 md:mt-0">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        {t("title")}
      </h1>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {t("subtitle")}
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
                        className={`relative flex cursor-pointer items-center justify-between overflow-hidden rounded-xl border  shadow-xl transition-all duration-200 hover:shadow-md ${
                          field.value === paymentMethod
                            ? "border-blue-500 bg-blue-50 shadow-md dark:bg-blue-900"
                            : "border-gray-300 dark:border-gray-700"
                        }`}
                      >
                        <div className="relative flex size-full items-center space-x-3  p-6">
                          <FormControl>
                            <RadioGroupItem
                              className="absolute left-0 top-0 size-full rounded-none text-transparent opacity-60"
                              value={paymentMethod}
                              checked={field.value === paymentMethod}
                            />
                          </FormControl>
                          {paymentIcons?.[paymentMethod] !== undefined ? (
                            paymentIcons[paymentMethod]
                          ) : (
                            <Wallet className="size-6 text-gray-500" />
                          )}
                          <FormLabel className="text-lg font-medium text-gray-800 dark:text-white">
                            {/*  {paymentMethod} */}
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
            <BrandButton
              type="submit"
              loading={isPending}
              icon={<ArrowRight className="size-4" />}
            >
              {t("continue_button")}
            </BrandButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ConfigPaymentMethodsPage;
